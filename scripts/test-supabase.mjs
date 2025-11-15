import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.error("Missing Supabase env vars. Check .env.local.");
  process.exit(1);
}

const supabase = createClient(url, anonKey);

async function fetchTablesViaOpenApi() {
  const response = await fetch(`${url}/rest/v1/`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`OpenAPI fetch failed: ${response.status} ${response.statusText}`);
  }

  const openApi = await response.json();
  const rawPaths = Object.keys(openApi.paths ?? {});
  const tables = rawPaths
    .filter((path) => path.startsWith("/") && path.length > 1)
    .map((path) => path.replace("/", ""))
    .filter((name) => !name.startsWith("rpc"));

  return [...new Set(tables)];
}

async function main() {
  console.log("➤ Fetching public tables via OpenAPI…");
  try {
    const tables = await fetchTablesViaOpenApi();
    console.log("✔ Tables:", tables);
  } catch (error) {
    console.error("✖ Failed to fetch tables via OpenAPI:", error.message);
  }

  console.log("➤ Sample profiles row…");
  const { data: profiles, error: profilesError } = await supabase.from("profiles").select("*").limit(1);

  if (profilesError) {
    console.error("✖ profiles query failed:", profilesError.message);
  } else {
    console.log("✔ profiles result:", profiles);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

