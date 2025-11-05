import { NextRequest, NextResponse } from 'next/server'
import { flowgladServer } from '@/lib/flowglad'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await flowgladServer.createUsageEvent(body)
    
    return NextResponse.json({ ok: true, data: result })
  } catch (error: any) {
    console.error('Error creating usage event:', { error: error.message })
    return NextResponse.json({ error: 'Failed to create usage event' }, { status: 500 })
  }
}
