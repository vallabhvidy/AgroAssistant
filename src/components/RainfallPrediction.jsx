import { useState } from 'react'
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Grid,
  Alert,
  CircularProgress,
  Chip,
  MenuItem,
} from '@mui/material'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import axios from 'axios'

const API_URL = 'https://pleat-gas-enigmatic.ngrok-free.dev'

const cities = [
  'Delhi',
  'Hyderabad',
  'Mumbai',
  'Bangalore',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Patna',
  'Bhopal',
  'Chandigarh',
  'Coimbatore',
  'Indore',
  'Kochi',
  'Nagpur',
  'Surat',
  'Vadodara',
  'Visakhapatnam'
]

function RainfallPrediction() {
  const [formData, setFormData] = useState({
    city: '',
    date: '',
    temp_max: '',
    temp_min: '',
    wind_speed: '',
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await axios.post(`${API_URL}/predict-rainfall-v2`, {
        city: formData.city,
        date: formData.date,
        temp_max: parseFloat(formData.temp_max),
        temp_min: parseFloat(formData.temp_min),
        wind_speed: parseFloat(formData.wind_speed),
      })
      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to get prediction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      city: '',
      date: '',
      temp_max: '',
      temp_min: '',
      wind_speed: '',
    })
    setResult(null)
    setError('')
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <WaterDropIcon sx={{ fontSize: 40, color: '#0288D1' }} />
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Rainfall Prediction
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Predict if it will rain on a specific day based on weather conditions.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Location & Date</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    >
                      {cities.map((city) => (
                        <MenuItem key={city} value={city}>{city}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: '2000-01-01', max: '2030-12-31' }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="h6" sx={{ mb: 2 }}>Weather Conditions</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Max Temperature"
                      name="temp_max"
                      type="number"
                      value={formData.temp_max}
                      onChange={handleChange}
                      required
                      inputProps={{ min: -10, max: 60, step: 0.1 }}
                      helperText="Celsius"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Min Temperature"
                      name="temp_min"
                      type="number"
                      value={formData.temp_min}
                      onChange={handleChange}
                      required
                      inputProps={{ min: -10, max: 60, step: 0.1 }}
                      helperText="Celsius"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Wind Speed"
                      name="wind_speed"
                      type="number"
                      value={formData.wind_speed}
                      onChange={handleChange}
                      required
                      inputProps={{ min: 0, max: 200, step: 0.1 }}
                      helperText="km/h"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{ flex: 1, backgroundColor: '#0288D1' }}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Predict Rainfall'}
                      </Button>
                      <Button variant="outlined" size="large" onClick={handleReset}>
                        Reset
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>

              {error && (
                <Alert severity="error" sx={{ mt: 3 }}>
                  {error}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          {result ? (
            <Card
              sx={{
                background: result.will_rain
                  ? 'linear-gradient(135deg, #0288D1 0%, #1565C0 100%)'
                  : 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
                color: 'white',
                textAlign: 'center',
                py: 5,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <CardContent>
                {result.will_rain ? (
                  <WaterDropIcon sx={{ fontSize: 80, mb: 2, opacity: 0.9 }} />
                ) : (
                  <WbSunnyIcon sx={{ fontSize: 80, mb: 2, opacity: 0.9 }} />
                )}
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {result.will_rain ? 'Rain Expected!' : 'No Rain Expected'}
                </Typography>
                <Box sx={{ mt: 3, p: 3, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Rain Probability
                  </Typography>
                  <Typography variant="h2" sx={{ fontWeight: 700 }}>
                    {result.rain_probability}%
                  </Typography>
                </Box>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label="Weather Forecast" sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                  <Chip label="Predicted" sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                </Box>
                <Box sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: 'white', color: result.will_rain ? '#0288D1' : '#F57C00', '&:hover': { backgroundColor: '#f5f5f5' } }}
                    onClick={handleReset}
                  >
                    Try Another Day
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ p: 4, textAlign: 'center', backgroundColor: '#E3F2FD', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <WaterDropIcon sx={{ fontSize: 80, color: '#0288D1', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Daily Rainfall Prediction
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Enter weather conditions to predict if rain is expected on a specific day.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Chip label="Rain Prediction" size="small" sx={{ m: 0.5 }} />
                <Chip label="Weather Forecast" size="small" sx={{ m: 0.5 }} />
                <Chip label="ML Powered" size="small" sx={{ m: 0.5 }} />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 3 }}>
                Tip: Enter current weather data for best results
              </Typography>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

const Divider = ({ sx }) => <div style={{ height: 1, backgroundColor: '#e0e0e0', margin: '16px 0', ...sx }} />

export default RainfallPrediction
