import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form data
    const providerType = formData.get("providerType") as string;
    const name = formData.get("name") as string;
    const descriptionPersian = formData.get("descriptionPersian") as string;
    const descriptionEnglish = formData.get("descriptionEnglish") as string;
    const province = formData.get("province") as string;
    const city = formData.get("city") as string;
    const onlineServices = formData.get("onlineServices") === "true";
    const responseSpeed = formData.get("responseSpeed") as string;
    const telegram = formData.get("telegram") as string;
    const signal = formData.get("signal") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const socialLink = formData.get("socialLink") as string;
    const consentDirectContact =
      formData.get("consentDirectContact") === "true";
    const consentTerms = formData.get("consentTerms") === "true";
    const logo = formData.get("logo") as File | null;

    // Get categories array
    const categories = formData.getAll("categories") as string[];
    const customCategory = formData.get("customCategory") as string;

    // Use service role client to bypass RLS for registration
    const supabase = createServiceRoleClient();

    // Upload logo if provided (skip if bucket doesn't exist)
    let logoUrl = null;
    if (logo && logo.size > 0) {
      try {
        const fileExt = logo.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `provider-logos/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("provider-logos")
          .upload(filePath, logo);

        if (!uploadError) {
          const {
            data: { publicUrl },
          } = supabase.storage.from("provider-logos").getPublicUrl(filePath);
          logoUrl = publicUrl;
        }
      } catch (storageError) {
        console.error("Storage error (continuing without logo):", storageError);
      }
    }

    // Insert provider data into service_provider table
    const { data: providerData, error: providerError } = await supabase
      .from("service_provider")
      .insert([
        {
          provider_type: providerType,
          logo_url: logoUrl,
          name: name,
          description_persian: descriptionPersian,
          description_english: descriptionEnglish || null,
          province: province || null,
          city: city || null,
          online_services: onlineServices,
          response_speed: responseSpeed,
          telegram: telegram || null,
          signal: signal || null,
          whatsapp: whatsapp || null,
          phone: phone || null,
          email: email || null,
          social_link: socialLink,
          consent_direct_contact: consentDirectContact,
          consent_terms: consentTerms,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (providerError) {
      console.error("Database error:", providerError);
      console.error("Provider data attempted:", {
        provider_type: providerType,
        name: name,
        description_persian: descriptionPersian,
        consent_direct_contact: consentDirectContact,
        consent_terms: consentTerms,
      });
      return NextResponse.json(
        {
          success: false,
          error: `خطا در ذخیره اطلاعات: ${providerError.message}`,
          details: providerError,
        },
        { status: 500 },
      );
    }

    // Get category IDs and insert into provider_category junction table
    if (categories.length > 0) {
      const { data: categoryData, error: categoryError } = await supabase
        .from("service_category")
        .select("id, name")
        .in("name", categories);

      if (!categoryError && categoryData) {
        const providerCategories = categoryData.map((cat) => ({
          provider_id: providerData.id,
          category_id: cat.id,
        }));

        const { error: junctionError } = await supabase
          .from("provider_category")
          .insert(providerCategories);

        if (junctionError) {
          console.error("Error inserting categories:", junctionError);
        }
      }
    }

    // Handle custom category request if provided
    if (customCategory && customCategory.trim()) {
      const { error: customCatError } = await supabase
        .from("custom_category_request")
        .insert([
          {
            provider_id: providerData.id,
            requested_category: customCategory,
            status: "pending",
          },
        ]);

      if (customCatError) {
        console.error("Error inserting custom category:", customCatError);
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "اطلاعات شما با موفقیت ثبت شد. پس از بررسی و تایید، با شما تماس خواهیم گرفت.",
      data: providerData,
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "خطای سرور. لطفا دوباره تلاش کنید.",
      },
      { status: 500 },
    );
  }
}
