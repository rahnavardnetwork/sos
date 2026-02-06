import { createClient } from "@/lib/supabase/server";

interface ApprovedProvider {
  id: string;
  name: string;
  description_persian: string;
  description_english: string;
  provider_type: string;
  logo_url: string;
  online_services: boolean;
  province: string;
  city: string;
  phone: string;
  email: string;
  telegram: string;
  whatsapp: string;
  signal: string;
  response_speed: string;
  categories: string[];
  category_ids: string[];
  created_at: string;
  approved_at: string;
}

export default async function TestPage() {
  const supabase = await createClient();

  const { data: providers, error } = await supabase
    .from("vw_approved_providers")
    .select("*");

  if (error) {
    console.error("Error fetching providers:", error);
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <h1 className="text-4xl font-bold mb-8">Test Page</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error:</p>
          <p>{error.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">
        Approved Providers (vw_approved_providers)
      </h1>

      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
        <p>✅ Successfully connected to Supabase!</p>
        <p className="text-sm mt-1">Found {providers?.length || 0} providers</p>
      </div>

      <div className="space-y-4">
        {providers?.map((provider: ApprovedProvider) => (
          <div
            key={provider.id}
            className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="space-y-2">
              <div className="flex items-start gap-4">
                {provider.logo_url && (
                  <img
                    src={provider.logo_url}
                    alt={provider.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{provider.name}</h2>
                  <p className="text-sm text-gray-600">
                    {provider.provider_type}
                  </p>
                </div>
              </div>
              <p className="text-sm">{provider.description_persian}</p>
              <div className="text-xs text-gray-500 space-y-1">
                <p>
                  📍 {provider.city}, {provider.province}
                </p>
                <p>
                  📧 {provider.email} | 📞 {provider.phone}
                </p>
                <p>Categories: {provider.categories?.join(", ")}</p>
                <p>Online Services: {provider.online_services ? "✅" : "❌"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
