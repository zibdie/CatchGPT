'use client';

import PDFGenerator from './components/PDFGenerator';
import Dashboard from './components/Dashboard';
import NavBar from './components/NavBar';
import { Box, Divider, Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Box>
      <NavBar />
      
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          AI Detection PDF Generator
        </Typography>
        
        <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
          Generate PDFs with hidden tracking URLs to catch students using AI chatbots for essays
        </Typography>
        
        <Box my={6}>
          <PDFGenerator />
        </Box>
        
        <Divider sx={{ my: 6 }} />
        
        <Box my={6}>
          <Dashboard />
        </Box>
      </Container>
    </Box>
  );
}
