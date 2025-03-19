'use client';

import { useState } from 'react';
import { 
  Container, Typography, Paper, TextField, 
  Button, Box, Alert, CircularProgress 
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { generatePDF } from '../lib/pdfGenerator';
import { SERVER_URL } from '../lib/config';

type FormData = {
  essayPrompt: string;
};

export default function PDFGenerator() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackerId, setTrackerId] = useState<string | null>(null);
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      essayPrompt: ''
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const { pdfBlob, trackerId } = generatePDF(data.essayPrompt, SERVER_URL);
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `essay_assignment_${trackerId.substring(0, 8)}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);      
      setSuccess(true);
      setTrackerId(trackerId);
      reset();
      
    } catch (err) {
      console.error(err);
      setError('Failed to generate PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          AI Tracker PDF Generator
        </Typography>
        
        <Typography variant="body1" paragraph>
          Generate an essay assignment PDF with hidden tracking to detect when students use AI tools.
          The PDF will include hidden text (white on white) with a tracking URL that AI tools will process.
        </Typography>
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            PDF successfully generated and downloaded!
            {trackerId && (
              <Typography variant="body2">
                Tracker ID: {trackerId}
              </Typography>
            )}
          </Alert>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller 
            name="essayPrompt"
            control={control}
            rules={{ required: 'Essay prompt is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Essay Prompt"
                fullWidth
                multiline
                rows={6}
                error={!!errors.essayPrompt}
                helperText={errors.essayPrompt?.message || ''}
                placeholder="Write an essay about the founding fathers of the Republic of Molvanîa..."
                sx={{ mb: 3 }}
              />
            )}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              Generate PDF
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
} 