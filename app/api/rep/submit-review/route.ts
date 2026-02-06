import { verifyAuth } from "@/lib/auth";
import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    console.log("Auth user:", user);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "غیرمجاز" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { provider_id, rating, notes, confidence } = body;

    console.log("Review payload:", {
      provider_id,
      rating,
      confidence,
      notes: notes?.slice(0, 50),
    });

    // Validate input - vote must be 1 (approve) or -1 (reject)
    if (!provider_id || rating === undefined || ![1, -1].includes(rating)) {
      console.log("Validation failed:", { provider_id, rating });
      return NextResponse.json(
        {
          success: false,
          message: "لطفا یک تصمیم انتخاب کنید",
          details: { provider_id, rating },
        },
        { status: 400 },
      );
    }

    // Check if provider exists in service_provider table
    console.log("Checking if provider exists:", provider_id);
    const { data: provider, error: providerError } = await supabase
      .from("service_provider")
      .select("id")
      .eq("id", provider_id)
      .single();

    console.log("Provider check result:", {
      provider,
      error: providerError?.message,
    });

    if (providerError || !provider) {
      return NextResponse.json(
        { success: false, message: "ارائه‌دهنده یافت نشد" },
        { status: 404 },
      );
    }

    // Check if rep already reviewed this provider
    console.log("Checking existing review");
    const { data: existingReview } = await supabase
      .from("provider_rep_reviews")
      .select("id")
      .eq("provider_id", provider_id)
      .eq("rep_id", user.id);

    console.log("Existing review:", existingReview);

    if (existingReview && existingReview.length > 0) {
      // Update existing review
      console.log("Updating existing review");
      const { error: updateError } = await supabase
        .from("provider_rep_reviews")
        .update({
          vote: rating,
          confidence: confidence || 3,
          notes: notes || "",
          updated_at: new Date().toISOString(),
        })
        .eq("provider_id", provider_id)
        .eq("rep_id", user.id);

      if (updateError) {
        console.error("Update error:", updateError.message);
        throw updateError;
      }
      console.log("Update successful");
    } else {
      // Insert new review
      console.log("Inserting new review");
      const { error: insertError } = await supabase
        .from("provider_rep_reviews")
        .insert({
          provider_id,
          rep_id: user.id,
          vote: rating,
          confidence: confidence || 3,
          notes: notes || "",
        });

      if (insertError) {
        console.error("Insert error:", insertError.message);
        throw insertError;
      }
      console.log("Insert successful");
    }

    return NextResponse.json({
      success: true,
      message: "نظر شما با موفقیت ثبت شد",
    });
  } catch (error) {
    console.error("Catch block error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        success: false,
        message: "خطا در ثبت نظر",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
