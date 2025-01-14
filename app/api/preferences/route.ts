// app/api/preferences/route.ts

import { NextResponse } from 'next/server';

// Global in-memory preferences object
let preferences = {
  emailNotifications: true,
  pushNotifications: false,
};

// Handle GET requests
export async function GET() {
  return NextResponse.json(preferences);
}

// Handle POST requests
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    if (
      typeof body.emailNotifications !== 'undefined' &&
      typeof body.emailNotifications !== 'boolean'
    ) {
      return NextResponse.json({ error: 'Invalid emailNotifications value' }, { status: 400 });
    }
    if (
      typeof body.pushNotifications !== 'undefined' &&
      typeof body.pushNotifications !== 'boolean'
    ) {
      return NextResponse.json({ error: 'Invalid pushNotifications value' }, { status: 400 });
    }

    // Update preferences
    preferences = { ...preferences, ...body };

    return NextResponse.json(preferences);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
