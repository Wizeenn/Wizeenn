"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSupabaseClient } from "@/lib/supabase"

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    const form = e.target as HTMLFormElement
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim()
    const password = (form.elements.namedItem("password") as HTMLInputElement).value

    try {
      const supabase = getSupabaseClient()

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          throw new Error("Email ou mot de passe incorrect.")
        }
        throw error
      }

      router.push("/dashboard")

    } catch (err: any) {
      setErrorMessage(err.message || "Impossible de se connecter.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-black">Connectez-vous à votre compte</h1>
        <p className="text-sm text-gray-500">
          Que vous soyez comptable ou entreprise, accédez à votre espace en toute simplicité.
        </p>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-center text-sm">{errorMessage}</p>
      )}

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Mot de passe</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Mot de passe oublié ?
            </a>
          </div>
          <Input id="password" name="password" type="password" required />
        </div>

        <Button type="submit" className="w-full h-12 bg-black text-white" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
      </div>

      <div className="text-center text-sm">
        Vous n&apos;avez pas de compte ?{" "}
        <a href="/auth/login" className="underline underline-offset-4" style={{ color: "#146df9" }}>
          Inscrivez-vous
        </a>
      </div>
    </form>
  )
}

