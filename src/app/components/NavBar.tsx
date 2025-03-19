'use client';

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';

export default function NavBar() {
  const pathname = usePathname();
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              CatchGPT - AI Detection System
            </Link>
          </Typography>
          
          <Button 
            color="inherit" 
            component={Link} 
            href="/"
            variant="outlined"
            startIcon={<HomeIcon />}
            sx={{ 
              textDecoration: pathname === '/' ? 'underline' : 'none',
              fontWeight: pathname === '/' ? 'bold' : 'normal',
              borderColor: 'white',
              marginLeft: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Home
          </Button>
          
          <Button 
            color="inherit" 
            component={Link} 
            href="/about"
            variant="outlined"
            startIcon={<InfoIcon />}
            sx={{ 
              textDecoration: pathname === '/about' ? 'underline' : 'none',
              fontWeight: pathname === '/about' ? 'bold' : 'normal',
              borderColor: 'white',
              marginLeft: 1,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            About
          </Button>
        </Box>
        
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
} 