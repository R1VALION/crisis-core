// app/api/status/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    estado: "ONLINE", 
    mensaje: "Cortex AI operativo", 
    timestamp: new Date().toISOString() 
  }, { status: 200 });
}