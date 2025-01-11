import { NextResponse } from 'next/server'

let manifests: { id: number; title: string }[] = []

export async function POST(req: Request) {
  const { title } = await req.json()
  const newManifest = { id: Date.now(), title }
  manifests.push(newManifest)
  return NextResponse.json(newManifest, { status: 201 })
}

export async function GET() {
  return NextResponse.json(manifests)
}

