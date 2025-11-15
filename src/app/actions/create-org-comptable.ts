import { createClient } from "@supabase/supabase-js"

export async function createOrgComptableAction(data: {
  cabinetName: string
  userId: string
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Missing Supabase credentials")
  }

  const admin = createClient(supabaseUrl, serviceKey)

  // Créer l'org avec le vrai owner_id (user créé avant)
  const { data: org, error } = await admin
    .from("orgs")
    .insert({
      name: data.cabinetName,
      type: "cabinet",
      owner_id: data.userId
    })
    .select()
    .single()

  if (error) throw error

  return org
}

export async function updateProfileOrgIdAction(data: {
  userId: string
  orgId: string
  firstName?: string
  lastName?: string
  phone?: string
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Missing Supabase credentials")
  }

  const admin = createClient(supabaseUrl, serviceKey)

  const updateData: {
    org_id: string
    first_name?: string
    last_name?: string
    phone?: string
  } = {
    org_id: data.orgId,
  }

  if (data.firstName) {
    updateData.first_name = data.firstName
  }

  if (data.lastName) {
    updateData.last_name = data.lastName
  }

  if (data.phone) {
    updateData.phone = data.phone
  }

  const { error } = await admin
    .from("profiles")
    .update(updateData)
    .eq("user_id", data.userId)

  if (error) throw error

  return { success: true }
}
