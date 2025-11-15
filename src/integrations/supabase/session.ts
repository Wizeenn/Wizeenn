"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "./server";

export async function getUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function isAuthenticated() {
  const user = await getUser();
  return Boolean(user);
}

export async function logout() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
}

