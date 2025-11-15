import { NextResponse } from "next/server"
import { createOrgComptableAction } from "@/app/actions/create-org-comptable"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const org = await createOrgComptableAction(body)
    return NextResponse.json(org)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create organization" },
      { status: 500 }
    )
  }
}

