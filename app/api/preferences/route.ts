import { NextResponse } from 'next/server'

let preferences = {
  emailNotifications: true,
  pushNotifications: false,
}

export async function GET() {
  return NextResponse.json(preferences)
}

export async function POST(req: Request) {
  const body = await req.json()
  preferences = { ...preferences, ...body }
  return NextResponse.json(preferences)
}
