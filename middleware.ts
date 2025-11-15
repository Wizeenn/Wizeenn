import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./src/integrations/supabase/config";
import type { Database } from "./src/integrations/supabase/types";

const PROTECTED_PATHS = ["/dashboard", "/recus", "/clients", "/equipe", "/parametres"];

const isProtectedPath = (pathname: string) =>
  PROTECTED_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for auth routes, login, signup and non-protected paths
  if (
    pathname.startsWith("/auth") ||
    pathname === "/login" ||
    pathname.startsWith("/signup") ||
    pathname === "/" ||
    !isProtectedPath(pathname)
  ) {
    return NextResponse.next();
  }

  try {
    const response = NextResponse.next();
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

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      const redirectUrl = new URL("/auth/login", request.url);
      redirectUrl.searchParams.set("redirect_to", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    return response;
  } catch (error) {
    // If there's an error in middleware, allow the request to continue
    // This prevents Internal Server Error from breaking the app
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

