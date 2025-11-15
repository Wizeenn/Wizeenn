"use client"

import type React from "react"

import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter()

  return (
    <form className={cn("flex flex-col gap-8", className)} {...props}>
      
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-black">
          Qu'est ce qui vous représente le mieux ?
        </h1>
        <p className="text-sm text-black/70">
          Sélectionnez votre rôle pour continuer.
        </p>
      </div>

      {/* Role selection */}
      <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
        
        {/* Comptable */}
        <Button
          type="button"
          onClick={() => router.push("/signup/comptable")}
          className="w-full h-20 flex flex-col justify-center items-center bg-white border border-gray-300 rounded-xl shadow-sm text-black hover:bg-gray-50"
        >
          <span className="font-semibold text-lg leading-tight">Je suis comptable</span>
          <span className="text-sm opacity-80 -mt-1">
            Je collabore avec mes clients.
          </span>
        </Button>

        {/* Entreprise */}
        <Button
          type="button"
          onClick={() => router.push("/auth/signup/entreprise")}
          className="w-full h-20 flex flex-col justify-center items-center bg-white border border-gray-300 rounded-xl shadow-sm text-black hover:bg-gray-50"
        >
          <span className="font-semibold text-lg leading-tight">
            Je suis une entreprise
          </span>
          <span className="text-sm opacity-80 -mt-1">
            Je collabore avec mon comptable.
          </span>
        </Button>

        {/* Already have an account */}
        <a
          href="/login"
          className="mt-4 text-center text-sm text-black/70 underline cursor-pointer"
        >
          J'ai déjà un compte.
        </a>

      </div>
    </form>
  )
}
