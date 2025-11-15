import { NextResponse } from "next/server"
import { createEntrepriseAction } from "@/app/actions/create-entreprise"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const entreprise = await createEntrepriseAction(body)
    return NextResponse.json(entreprise)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create entreprise" },
      { status: 500 }
    )
  }
}

