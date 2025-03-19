import { NextRequest, NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';
import { TrackingDB, TrackingInfo } from '@/app/lib/models';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  /* Extract tracker ID from URL */
  const tracker = request.nextUrl.searchParams.get('tracker');
  
  if (!tracker) {
    return NextResponse.json({ error: 'No tracker provided' }, { status: 400 });
  }

  /* Get IP address from headers or direct connection */
  const ipAddress = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown';
  
  /* Get user agent */
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  /* Generate fake data (which the AI will use to write the essay) */
  const fakeName = faker.person.fullName();
  
  /* Create unique ID for this tracking instance */
  const id = crypto.randomUUID();
  
  /* Store tracking info */
  const trackingInfo: TrackingInfo = {
    id,
    userAgent,
    ipAddress: typeof ipAddress === 'string' ? ipAddress : 'unknown',
    timestamp: new Date(),
    fakeName
  };
  
  TrackingDB.addTracking(trackingInfo);
  
  /* Return fake data */
  return NextResponse.json({
    name: fakeName,
    bio: faker.lorem.paragraph(),
    accomplishments: [
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.lorem.sentence()
    ]
  });
} 