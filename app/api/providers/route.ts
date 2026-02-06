import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const province = searchParams.get("province");
    const isOnline = searchParams.get("isOnline") === "true";
    const isOutOfIran = searchParams.get("isOutOfIran") === "true";

    let query = db.supabase.from("vw_approved_providers").select("*");

    // Filter by category
    if (categoryId) {
      query = query.contains("category_ids", [parseInt(categoryId)]);
    }

    // Filter by location and online services
    if (isOnline || isOutOfIran) {
      // Show providers with online/out of Iran services
      query = query.eq("online_services", true);
    } else if (province) {
      // Show providers that match province OR have "تمام شهرها" OR offer online services
      // We need to fetch all and filter in code since Supabase OR with array contains is complex
    }

    let { data: providers, error } = await query;

    if (error) {
      throw error;
    }

    // Additional filtering for province case
    if (province && !isOnline && !isOutOfIran && providers) {
      providers = providers.filter((provider: any) => {
        const provinces = provider.provinces || [];
        return (
          provinces.includes(province) ||
          provinces.includes("تمام شهرها") ||
          provider.online_services === true
        );
      });
    }

    return NextResponse.json(providers || []);
  } catch (error) {
    console.error("Error fetching providers:", error);
    return NextResponse.json(
      { error: "Failed to fetch providers" },
      { status: 500 },
    );
  }
}
