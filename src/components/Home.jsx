import { Container, Typography, Grid, Card, CardContent, CardActionArea, Box, Chip } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import GrassIcon from '@mui/icons-material/Grass'
import ScienceIcon from '@mui/icons-material/Science'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import BugReportIcon from '@mui/icons-material/BugReport'
import BarChartIcon from '@mui/icons-material/BarChart'

const services = [
  {
    title: 'Crop Recommendation',
    description: 'Get the best crop recommendations based on your soil nutrients, temperature, humidity, pH, and rainfall.',
    icon: <GrassIcon sx={{ fontSize: 48, color: '#2E7D32' }} />,
    path: '/crop',
    color: '#E8F5E9',
    tag: 'ML Powered',
  },
  {
    title: 'Fertilizer Recommendation',
    description: 'Optimize your yield with personalized fertilizer suggestions based on soil and crop conditions.',
    icon: <ScienceIcon sx={{ fontSize: 48, color: '#795548' }} />,
    path: '/fertilizer',
    color: '#EFEBE9',
    tag: 'Smart Farming',
  },
  {
    title: 'Rainfall Prediction',
    description: 'Predict annual rainfall patterns to plan irrigation and crop cycles effectively.',
    icon: <WaterDropIcon sx={{ fontSize: 48, color: '#0288D1' }} />,
    path: '/rainfall',
    color: '#E3F2FD',
    tag: 'Weather Forecast',
  },
  {
    title: 'Crop Yield Prediction',
    description: 'Estimate your crop yield based on area, crop type, rainfall, pesticides, and temperature.',
    icon: <ShowChartIcon sx={{ fontSize: 48, color: '#F57C00' }} />,
    path: '/yield',
    color: '#FFF3E0',
    tag: 'Analytics',
  },
  {
    title: 'Plant Disease Detection',
    description: 'Upload a plant leaf image to detect diseases and get treatment recommendations instantly.',
    icon: <BugReportIcon sx={{ fontSize: 48, color: '#D32F2F' }} />,
    path: '/disease',
    color: '#FFEBEE',
    tag: 'Vision',
  },
  {
    title: 'Statistics Dashboard',
    description: 'Explore insights and trends from agricultural datasets across India.',
    icon: <BarChartIcon sx={{ fontSize: 48, color: '#7B1FA2' }} />,
    path: '/statistics',
    color: '#F3E5F5',
    tag: 'Insights',
  },
]

function Home() {
  return (
    <Box>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 50%, #81C784 100%)',
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: '0 0 50px 50px',
          boxShadow: '0 8px 32px rgba(46, 125, 50, 0.3)',
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
            Welcome to AgroAssistant
          </Typography>
          {/* <Typography variant="h5" sx={{ opacity: 0.95, maxWidth: 700, mx: 'auto', mb: 4 }}>
            Empowering farmers with data-driven agricultural insights for better crop management and higher yields.
          </Typography> */}
          {/* <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            {['Precision Farming', 'Data-Driven', 'Sustainable Agriculture'].map((tag) => (
              <Chip
                key={tag}
                label={tag}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 500,
                  px: 1,
                }}
              />
            ))}
          </Box> */}
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
          Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.path}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: service.color,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <CardActionArea
                  component={RouterLink}
                  to={service.path}
                  sx={{ height: '100%' }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ mb: 3 }}>{service.icon}</Box>
                    <Chip
                      label={service.tag}
                      size="small"
                      sx={{
                        mb: 2,
                        backgroundColor: 'rgba(0,0,0,0.08)',
                        fontWeight: 500,
                      }}
                    />
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Our models are trained on extensive agricultural datasets to provide accurate predictions and recommendations.
          </Typography>
        </Box> */}
      </Container>
    </Box>
  )
}

export default Home
