import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/integrations/supabase/config";
import type { Database } from "@/integrations/supabase/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  const redirectUrl = new URL(code ? next : "/auth/login", request.url);
  const response = NextResponse.redirect(redirectUrl);

  if (!code) {
    return response;
  }

  const { url, anonKey } = getSupabaseConfig();

  const supabase = createServerClient<Database>(url, anonKey, {
    cookies: {
      get(name) {
        return request.cookies.get(name)?.value;
      },
      set(name, value, options) {
        response.cookies.set(name, value, options);
      },
      remove(name) {
        response.cookies.delete(name);
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    const errorRedirect = new URL("/auth/login", request.url);
    errorRedirect.searchParams.set("error", error.message);
    return NextResponse.redirect(errorRedirect);
  }

  return response;
}

