import { NextResponse } from "next/server"
import { updateProfileOrgIdAction } from "@/app/actions/create-org-comptable"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = await updateProfileOrgIdAction(body)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update profile org_id" },
      { status: 500 }
    )
  }
}

