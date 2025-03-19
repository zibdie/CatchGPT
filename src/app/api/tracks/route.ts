import { NextResponse } from 'next/server';
import { TrackingDB } from '@/app/lib/models';

export async function GET() {
  const trackings = TrackingDB.getAllTrackings();
  return NextResponse.json(trackings);
} 