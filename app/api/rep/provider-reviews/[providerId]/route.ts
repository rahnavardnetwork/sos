import { verifyAuth } from "@/lib/auth";
import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ providerId: string }> },
) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "غیرمجاز" },
        { status: 401 },
      );
    }

    const { providerId } = await params;

    // Query reviews for this provider
    const { data: reviews, error } = await supabase
      .from("provider_rep_reviews")
      .select(
        `
        id,
        rep_id,
        vote,
        confidence,
        notes,
        created_at,
        rep(full_name)
      `,
      )
      .eq("provider_id", providerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reviews:", error);
      return NextResponse.json(
        { success: false, message: "خطا در دریافت نظرات" },
        { status: 500 },
      );
    }

    // Transform data to match frontend expectations
    const transformedReviews =
      reviews?.map((review: any) => ({
        id: review.id,
        rep_name: review.rep?.full_name || "نامشناخته",
        rating: review.vote,
        confidence: review.confidence,
        notes: review.notes,
        created_at: review.created_at,
      })) || [];

    return NextResponse.json({
      success: true,
      reviews: transformedReviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, message: "خطا در دریافت نظرات" },
      { status: 500 },
    );
  }
}
