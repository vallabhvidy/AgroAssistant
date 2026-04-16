import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import AgriculturalIcon from '@mui/icons-material/Agriculture'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Crop', path: '/crop' },
  { label: 'Fertilizer', path: '/fertilizer' },
  { label: 'Rainfall', path: '/rainfall' },
  { label: 'Yield', path: '/yield' },
  { label: 'Disease', path: '/disease' },
  { label: 'Statistics', path: '/statistics' },
]

function Navbar() {
  return (
    <AppBar position="sticky" color="primary" elevation={2}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <AgriculturalIcon sx={{ mr: 1.5, fontSize: 32 }} />
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            AgroAssistant
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={RouterLink}
                to={item.path}
                color="inherit"
                sx={{
                  fontWeight: 500,
                  px: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.15)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
