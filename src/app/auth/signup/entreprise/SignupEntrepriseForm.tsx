"use client"

import type React from "react"

import { useState } from "react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { getSupabaseClient } from "@/lib/supabase"

export default function SignupEntrepriseForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const [loading, setLoading] = useState(false)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    setErrorMessage(null)

    setSuccessMessage(null)

    const form = e.target as HTMLFormElement

    const rawOrgId = (form.elements.namedItem("org_id") as HTMLInputElement).value

    const orgId = rawOrgId
      .trim()
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .replace(/\s+/g, "")

    const entrepriseName = (form.elements.namedItem("entrepriseName") as HTMLInputElement).value.trim()

    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim()

    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim()

    const password = (form.elements.namedItem("password") as HTMLInputElement).value

    try {
      const supabase = getSupabaseClient()

      const { data: orgCheck, error: orgCheckError } = await supabase
        .from("orgs")
        .select("id")
        .eq("id", orgId)
        .single()

      if (orgCheckError || !orgCheck) {
        throw new Error("L'ID d'organisation fourni n'existe pas. Vérifiez auprès de votre comptable.")
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || undefined,
          data: {
            phone,
            account_type: "client",
            org_id: orgId,
            entreprise_name: entrepriseName,
          }
        }
      })

      if (error) throw error
      if (!data.user) throw new Error("Utilisateur non créé.")

      const userId = data.user.id

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw new Error("Impossible de se connecter: " + signInError.message)

      await new Promise(resolve => setTimeout(resolve, 1500))

      const res = await fetch("/api/create-entreprise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          orgId,
          entrepriseName,
          phone,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Erreur lors de la création de l'entreprise")
      }

      const entreprise = await res.json()

      setSuccessMessage("Compte créé avec succès ! Bienvenue.")
      form.reset()

    } catch (err: any) {
      let message = err.message || "Une erreur est survenue."
      if (message.includes("User already registered")) {
        message = "Cet email est déjà utilisé."
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
        <h1 className="text-2xl font-bold text-black">Créer votre compte entreprise</h1>
      </div>

      {errorMessage && <p className="text-red-500 text-center text-sm">{errorMessage}</p>}
      {successMessage && <p className="text-green-600 text-center text-sm">{successMessage}</p>}

      <div className="flex flex-col w-full max-w-sm mx-auto gap-4">

        <div className="flex flex-col gap-2">
          <Label htmlFor="entrepriseName">Nom de l'entreprise</Label>
          <Input id="entrepriseName" name="entrepriseName" required />
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

        <div className="flex flex-col gap-2">
          <Label htmlFor="org_id">ID d'organisation</Label>
          <Input
            id="org_id"
            name="org_id"
            placeholder="Ex: 90d57b03-8758-495a-be5f-0b5dfd048e45"
            required
          />

          <div className="flex flex-col items-center mt-1">
            <p className="text-xs text-black text-center">
              Rapprochez-vous de votre comptable pour l'obtenir.
            </p>

            <a
              href="https://wizeenn.com/creation-compte-entreprise"
              target="_blank"
              className="text-xs underline"
              style={{ color: "#146df9" }}
            >
              Voir comment l'obtenir
            </a>
          </div>
        </div>

        <Button disabled={loading} type="submit" className="w-full h-12 bg-black text-white">
          {loading ? "Création..." : "Créer mon compte"}
        </Button>

      </div>
    </form>
  )
}
