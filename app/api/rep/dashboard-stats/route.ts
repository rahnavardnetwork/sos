import { verifyAuth } from "@/lib/auth";
import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "غیرمجاز" },
        { status: 401 },
      );
    }

    // Get pending providers count
    const { count: pendingCount } = await supabase
      .from("vw_pending_providers")
      .select("id", { count: "exact", head: true });

    // Get count of providers reviewed by this rep
    const { count: reviewedCount } = await supabase
      .from("provider_rep_reviews")
      .select("provider_id", { count: "exact", head: true })
      .eq("rep_id", user.id);

    // Get approved and rejected counts for this rep
    const { data: repReviews } = await supabase
      .from("provider_rep_reviews")
      .select("vote")
      .eq("rep_id", user.id);

    const approvedCount =
      repReviews?.filter((r: any) => r.vote === 1).length || 0;
    const rejectedCount =
      repReviews?.filter((r: any) => r.vote === -1).length || 0;

    return NextResponse.json({
      success: true,
      stats: {
        pending: pendingCount || 0,
        approved: approvedCount,
        rejected: rejectedCount,
        reviewed: reviewedCount || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, message: "خطا در دریافت آمار" },
      { status: 500 },
    );
  }
}
