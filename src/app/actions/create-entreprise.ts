import { createClient } from "@supabase/supabase-js"

export async function createEntrepriseAction(data: {
  userId: string
  orgId: string
  entrepriseName: string
  phone: string
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Missing Supabase credentials")
  }

  const admin = createClient(supabaseUrl, serviceKey)

  const { data: entreprise, error } = await admin
    .from("entreprises")
    .insert({
      owner_id: data.userId,
      org_id: data.orgId,
      name: data.entrepriseName,
    })
    .select()
    .single()

  if (error) {
    throw new Error("Impossible de créer l'entreprise: " + error.message)
  }

  await admin
    .from("profiles")
    .update({
      entreprise_id: entreprise.id,
      phone: data.phone,
    })
    .eq("user_id", data.userId)

  return entreprise
}
