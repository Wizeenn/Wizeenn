"use client"

import { ChevronLeft } from "lucide-react"
import SignupComptableForm from "./SignupComptableForm"

export default function SignupComptablePage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 p-6 md:p-10">

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-black/70 hover:text-black transition-colors mb-2 w-fit"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Retour</span>
        </button>

        {/* Logo */}
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-3 font-medium">
            <img
              src="https://i.postimg.cc/DZ5P39Pt/all.png"
              alt="Wizeenn Logo"
              className="h-10 w-10 object-contain rounded-lg"
            />
            <span className="text-lg font-semibold">Wizeenn</span>
          </a>
        </div>

        {/* Form */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupComptableForm />
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://i.postimg.cc/7hs00DWc/image.jpg"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2]"
        />
      </div>

    </div>
  )
}
