"use client"

import type React from "react"

import { useState } from "react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { getSupabaseClient } from "@/lib/supabase"

export default function SignupComptableForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const [loading, setLoading] = useState(false)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    setErrorMessage(null)

    setSuccessMessage(null)

    const form = e.target as HTMLFormElement

    const cabinetName = (form.elements.namedItem("org") as HTMLInputElement).value.trim()

    const firstName = (form.elements.namedItem("firstName") as HTMLInputElement).value.trim()

    const lastName = (form.elements.namedItem("lastName") as HTMLInputElement).value.trim()

    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim()

    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim()

    const password = (form.elements.namedItem("password") as HTMLInputElement).value

    try {
      // 1. SignUp d'abord pour obtenir le user_id
      const supabase = getSupabaseClient()

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || undefined,
          data: {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            account_type: "comptable",
            org_name: cabinetName,
          }
        }
      })

      if (error) throw error

      if (!data.user) {
        throw new Error("Utilisateur non créé")
      }

      const userId = data.user.id

      // 2. Créer l'organisation avec le vrai owner_id
      const createOrgResponse = await fetch("/api/create-org-comptable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cabinetName, userId }),
      })

      if (!createOrgResponse.ok) {
        const errorData = await createOrgResponse.json()
        throw new Error(errorData.error || "Impossible de créer l'organisation")
      }

      const org = await createOrgResponse.json()
      const orgId = org?.id

      if (!orgId) {
        throw new Error("Impossible de créer l'organisation")
      }

      // 3. Mettre à jour le profile avec l'org_id, first_name, last_name et phone
      const updateProfileResponse = await fetch("/api/update-profile-org-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          userId, 
          orgId,
          firstName,
          lastName,
          phone
        }),
      })

      if (!updateProfileResponse.ok) {
        const errorData = await updateProfileResponse.json()
        // Ne pas bloquer si la mise à jour du profile échoue, le trigger peut le faire
        console.warn("Profile update warning:", errorData.error)
      }

      setSuccessMessage("Compte créé avec succès ! Vérifiez votre email pour confirmer.")

    } catch (err: any) {
      let message = err.message || "Une erreur est survenue"

      if (err.message?.includes("rate limit")) {
        message = "Trop de tentatives, réessayez dans quelques minutes."
      } else if (err.message?.includes("already registered")) {
        message = "Email déjà utilisé, essayez de vous connecter."
      }

      setErrorMessage(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSignup}
      className={cn("flex flex-col gap-8", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-black">Créer votre compte comptable</h1>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-center text-sm">{errorMessage}</p>
      )}

      {successMessage && (
        <p className="text-green-600 text-center text-sm font-medium">
          {successMessage}
        </p>
      )}

      <div className="flex flex-col w-full max-w-sm mx-auto gap-4">

        <div className="flex flex-col gap-2">
          <Label htmlFor="org">Nom du cabinet</Label>
          <Input id="org" name="org" required />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-1/2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input id="firstName" name="firstName" required />
          </div>

          <div className="flex flex-col gap-2 w-1/2">
            <Label htmlFor="lastName">Nom</Label>
            <Input id="lastName" name="lastName" required />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" name="phone" type="tel" required />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" name="password" type="password" required minLength={6} />
        </div>

        <Button disabled={loading} type="submit" className="w-full h-12 bg-black text-white">
          {loading ? "Création..." : "Continuer"}
        </Button>

      </div>
    </form>
  )
}

