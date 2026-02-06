import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data: categories, error } = await db.supabase
      .from("service_category")
      .select("id, name, name_english, sort")
      .order("sort", { ascending: true, nullsFirst: false });

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return NextResponse.json(categories || []);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
