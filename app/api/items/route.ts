import { NextResponse } from 'next/server'

let items: { id: number; name: string; assignedTo: string }[] = []

export async function POST(req: Request) {
  const { name, assignedTo } = await req.json()
  const newItem = { id: Date.now(), name, assignedTo }
  items.push(newItem)
  return NextResponse.json(newItem, { status: 201 })
}

export async function GET() {
  return NextResponse.json(items)
}

