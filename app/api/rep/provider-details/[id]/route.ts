import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // بررسی session
    const { data: session } = await supabase
      .from("rep_session")
      .select("rep_id")
      .eq("session_token", token)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (!session) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const { id: providerId } = await params;

    // دریافت اطلاعات کامل provider
    const { data: provider, error } = await supabase
      .from("service_provider")
      .select("*")
      .eq("id", providerId)
      .single();

    if (error) throw error;

    // دریافت category ها
    const { data: categories } = await supabase
      .from("provider_category")
      .select(
        `
        category_id,
        service_category (
          id,
          name_persian,
          name_english
        )
      `,
      )
      .eq("provider_id", providerId);

    // دریافت ریویوهای موجود
    const { data: reviews } = await supabase
      .from("provider_rep_reviews")
      .select(
        `
        id,
        vote,
        confidence,
        notes,
        created_at,
        rep:rep_id (
          full_name,
          username
        )
      `,
      )
      .eq("provider_id", providerId)
      .order("created_at", { ascending: false });

    // دریافت نتیجه ارزیابی اگر وجود داره
    const { data: evaluation } = await supabase
      .from("provider_evaluation_results")
      .select("*")
      .eq("provider_id", providerId)
      .single();

    return NextResponse.json({
      success: true,
      provider: {
        ...provider,
        categories: categories?.map((c) => c.service_category) || [],
      },
      reviews: reviews || [],
      evaluation,
    });
  } catch (error: any) {
    console.error("Error fetching provider details:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
