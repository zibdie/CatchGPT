'use client';

import React from 'react';
import { 
  Container, Typography, Paper, Box, 
  Divider, Accordion, AccordionSummary, 
  AccordionDetails, Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import NavBar from '@/app/components/NavBar';

export default function AboutPage() {
  return (
    <Box>
      <NavBar />
      
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            About CatchGPT
          </Typography>
          
          <Typography variant="body1" paragraph>
            CatchGPT is an educational tool designed to help educators detect when students 
            are using AI chatbots like ChatGPT to complete their assignments. By generating 
            PDFs with hidden tracking URLs, educators can identify when assignments are being 
            processed by AI systems.
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h5" component="h2" gutterBottom>
            Frequently Asked Questions
          </Typography>
          
          <Box mt={2}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight="bold">
                  How does CatchGPT work?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  CatchGPT works by embedding invisible tracking URLs within PDF documents. When a student 
                  submits this PDF content to an AI system that has access to the internet, like ChatGPT, the AI processes all the text, 
                  including the hidden tracking URL. When the AI attempts to visit this URL to get more information, our system 
                  logs the access, revealing that the assignment was processed by an AI rather than 
                  completed by the student directly.
                </Typography>
              </AccordionDetails>
            </Accordion>
            
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Is this meant to punish students?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  No. CatchGPT is designed as an educational tool to help teachers understand how 
                  students are engaging with their assignments. It can be used to start meaningful 
                  conversations about proper AI usage, academic integrity, and the changing 
                  landscape of education in the age of AI. Our goal is to encourage proper attribution 
                  and collaboration with AI tools, not to prohibit their use entirely.
                </Typography>
              </AccordionDetails>
            </Accordion>
            
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Who created this?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" alignItems="center">
                  <Typography variant="body1">
                    CatchGPT was created by 
                  </Typography>
                  <Chip
                    icon={<WavingHandIcon />}
                    label="Nour Zibdie"
                    component="a"
                    href="https://nour.zibdie.com"
                    target="_blank"
                    clickable
                    color="primary"
                    variant="outlined"
                    sx={{ 
                      mx: 1,
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      padding: '5px 5px',
                      height: 'auto',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                      }
                    }}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
            
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Can students detect the tracking URL?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  The tracking URL is hidden using white text on a white background, which makes it 
                  invisible to casual observation. However, it is not completely undetectable - if a 
                  student selects all text in the PDF, they might notice extra text. This project is merely 
                a proof of concept 
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
        </Paper>
      </Container>
    </Box>
  );
} 