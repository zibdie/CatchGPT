// Import necessary types from 'next'
import { NextRequest } from 'next/server';

// This is a Next.js 15 App Router API Route
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Access the id from dynamic route segment
    const id = params.id;
    
    // Dynamically import to avoid any module resolution issues
    const models = await import('@/app/lib/models');
    const tracking = models.TrackingDB.getTracking(id);
    
    if (!tracking) {
      return Response.json({ error: 'Tracking not found' }, { status: 404 });
    }
    
    return Response.json(tracking);
  } catch (error) {
    console.error('Error in GET /api/tracks/[id]:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
