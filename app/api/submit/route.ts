import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role for server-side operations
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const providerData = {
      provider_type: formData.get('providerType') as string,
      name: formData.get('name') as string,
      description_persian: formData.get('descriptionPersian') as string,
      description_english: formData.get('descriptionEnglish') as string || null,
      province: formData.get('province') as string || null,
      city: formData.get('city') as string || null,
      online_services: formData.get('onlineServices') === 'true',
      response_speed: formData.get('responseSpeed') as string,
      telegram: formData.get('telegram') as string || null,
      signal: formData.get('signal') as string || null,
      whatsapp: formData.get('whatsapp') as string || null,
      phone: formData.get('phone') as string || null,
      email: formData.get('email') as string || null,
      social_link: formData.get('socialLink') as string,
      consent_direct_contact: formData.get('consentDirectContact') === 'true',
      consent_terms: formData.get('consentTerms') === 'true',
    };

    // Handle logo upload if present
    const logoFile = formData.get('logo') as File | null;
    let logoUrl = null;

    if (logoFile) {
      const fileExt = logoFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `provider-logos/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('provider-assets') // Make sure this bucket exists in Supabase
        .upload(filePath, logoFile);

      if (uploadError) {
        console.error('Logo upload error:', uploadError);
      } else {
        const { data: urlData } = supabase.storage
          .from('provider-assets')
          .getPublicUrl(filePath);
        logoUrl = urlData.publicUrl;
      }
    }

    // Insert provider into database
    const { data: provider, error: providerError } = await supabase
      .from('service_provider')
      .insert({
        ...providerData,
        logo_url: logoUrl,
      })
      .select()
      .single();

    if (providerError) {
      console.error('Provider insert error:', providerError);
      return NextResponse.json(
        { error: 'خطا در ثبت اطلاعات. لطفا دوباره تلاش کنید.' },
        { status: 500 }
      );
    }

    // Insert selected categories
    const categoryNames = formData.getAll('categories') as string[];
    if (categoryNames.length > 0) {
      // First, get the category IDs from the names
      const { data: categories, error: categoryFetchError } = await supabase
        .from('service_category')
        .select('id, name')
        .in('name', categoryNames);

      if (categoryFetchError) {
        console.error('Category fetch error:', categoryFetchError);
      } else if (categories && categories.length > 0) {
        const categoryInserts = categories.map(category => ({
          provider_id: provider.id,
          category_id: category.id,
        }));

        const { error: categoryError } = await supabase
          .from('provider_category')
          .insert(categoryInserts);

        if (categoryError) {
          console.error('Category insert error:', categoryError);
          // Don't fail the whole request for category errors
        }
      }
    }

    // Insert custom category request if provided
    const customCategory = formData.get('customCategory') as string;
    if (customCategory) {
      await supabase
        .from('custom_category_request')
        .insert({
          provider_id: provider.id,
          requested_category: customCategory,
        });
    }

    return NextResponse.json({
      success: true,
      message: 'ثبت‌نام شما با موفقیت انجام شد. پس از بررسی، پروفایل شما فعال خواهد شد.',
      providerId: provider.id,
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'خطای سرور. لطفا بعدا تلاش کنید.' },
      { status: 500 }
    );
  }
}