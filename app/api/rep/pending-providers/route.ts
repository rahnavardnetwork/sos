import { verifyAuth } from "@/lib/auth";
import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    console.log("Auth user:", user);

    if (!user) {
      console.log("No user authenticated");
      return NextResponse.json(
        { success: false, message: "غیرمجاز" },
        { status: 401 },
      );
    }

    // Get pending providers from the view
    const { data: providers, error } = await supabase
      .from("vw_pending_providers")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("Providers error:", error);
    console.log("Providers data:", providers);

    if (error) {
      console.error("Error fetching providers:", error);
      return NextResponse.json(
        {
          success: false,
          message: "خطا در دریافت ارائه‌دهندگان",
          error: error.message,
        },
        { status: 500 },
      );
    }

    // Transform and enrich with review counts
    const enrichedProviders = await Promise.all(
      (providers || []).map(async (p: any) => {
        // Get review count for this provider
        const { count: reviewCount } = await supabase
          .from("provider_rep_reviews")
          .select("id", { count: "exact", head: true })
          .eq("provider_id", p.id);

        return {
          id: p.id,
          name: p.name,
          description_persian: p.description_persian,
          provider_type: p.provider_type,
          logo_url: null,
          province: p.province,
          city: p.city,
          created_at: p.created_at,
          current_review_count: reviewCount || 0,
          reviews_needed: Math.max(0, 7 - (reviewCount || 0)),
        };
      }),
    );

    return NextResponse.json({
      success: true,
      providers: enrichedProviders,
    });
  } catch (error) {
    console.error("Catch error:", error);
    return NextResponse.json(
      { success: false, message: "خطا در دریافت ارائه‌دهندگان" },
      { status: 500 },
    );
  }
}
