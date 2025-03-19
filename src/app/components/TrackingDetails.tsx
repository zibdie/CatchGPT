'use client';

import { useState, useEffect } from 'react';
import { 
  Container, Typography, Paper, Box, 
  CircularProgress, Grid, Divider, Card, 
  CardContent, Button
} from '@mui/material';
import { TrackingInfo } from '../lib/models';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface TrackingDetailsProps {
  id: string;
}

export default function TrackingDetails({ id }: TrackingDetailsProps) {
  const [tracking, setTracking] = useState<TrackingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchTrackingDetails() {
      try {
        const response = await fetch(`/api/tracks/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Tracking information not found');
          }
          throw new Error('Failed to fetch tracking data');
        }
        const data = await response.json();
        setTracking(data);
        setLoading(false);
      } catch (err) {
        setError('Error loading tracking details');
        setLoading(false);
        console.error(err);
      }
    }

    fetchTrackingDetails();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !tracking) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography color="error" variant="h6">
            {error || 'Tracking information not found'}
          </Typography>
          <Box mt={2}>
            <Button 
              startIcon={<ArrowBackIcon />} 
              variant="outlined" 
              onClick={() => router.push('/')}
            >
              Back to Dashboard
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box mb={3}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          variant="outlined" 
          onClick={() => router.push('/')}
        >
          Back to Dashboard
        </Button>
      </Box>
      
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tracking Details
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Basic Information
                </Typography>
                <Typography variant="body1">
                  <strong>Tracking ID:</strong> {tracking.id}
                </Typography>
                <Typography variant="body1">
                  <strong>Time of Access:</strong> {new Date(tracking.timestamp).toLocaleString()}
                </Typography>
                <Typography variant="body1">
                  <strong>Fake Name Generated:</strong> {tracking.fakeName}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Technical Information
                </Typography>
                <Typography variant="body1">
                  <strong>IP Address:</strong> {tracking.ipAddress}
                </Typography>
                <Typography variant="body1">
                  <strong>User Agent:</strong> {tracking.userAgent}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
} 