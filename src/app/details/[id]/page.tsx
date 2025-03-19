'use client';

import TrackingDetails from '@/app/components/TrackingDetails';
import NavBar from '@/app/components/NavBar';
import { Box } from '@mui/material';

export default function DetailsPage({ params }: { params: { id: string } }) {
  return (
    <Box>
      <NavBar />
      <TrackingDetails id={params.id} />
    </Box>
  );
} 