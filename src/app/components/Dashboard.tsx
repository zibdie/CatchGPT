'use client';

import { useState, useEffect } from 'react';
import { 
  Container, Typography, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, 
  Box, CircularProgress
} from '@mui/material';
import { TrackingInfo } from '../lib/models';
import Link from 'next/link';

export default function Dashboard() {
  const [trackings, setTrackings] = useState<TrackingInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrackings() {
      try {
        const response = await fetch('/api/tracks');
        if (!response.ok) {
          throw new Error('Failed to fetch tracking data');
        }
        const data = await response.json();
        setTrackings(data);
        setLoading(false);
      } catch (err) {
        setError('Error loading tracking data');
        setLoading(false);
        console.error(err);
      }
    }

    fetchTrackings();
    
    /* Refresh data every 30 seconds */
    const intervalId = setInterval(fetchTrackings, 30000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tracking Dashboard
      </Typography>
      
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        {trackings.length} tracking records found
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Fake Name</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trackings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No tracking data available yet.
                </TableCell>
              </TableRow>
            ) : (
              trackings.map((track) => (
                <TableRow key={track.id}>
                  <TableCell>{track.id.substring(0, 8)}...</TableCell>
                  <TableCell>{new Date(track.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{track.fakeName}</TableCell>
                  <TableCell>{track.ipAddress}</TableCell>
                  <TableCell>
                    <Link href={`/details/${track.id}`}>View Details</Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
} 