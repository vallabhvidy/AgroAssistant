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
  Divider,
  Chip,
} from '@mui/material'
import GrassIcon from '@mui/icons-material/Grass'
import axios from 'axios'

const API_URL = 'https://pleat-gas-enigmatic.ngrok-free.dev'

const crops = [
  'rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas',
  'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate',
  'banana', 'mango', 'grapes', 'watermelon', 'muskmelon', 'apple',
  'orange', 'papaya', 'coconut', 'cotton', 'jute', 'coffee'
]

function CropRecommendation() {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
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
      const response = await axios.post(`${API_URL}/predict-crop`, {
        N: parseFloat(formData.N),
        P: parseFloat(formData.P),
        K: parseFloat(formData.K),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall),
      })
      setResult(response.data.recommended_crop)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to get prediction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      N: '',
      P: '',
      K: '',
      temperature: '',
      humidity: '',
      ph: '',
      rainfall: '',
    })
    setResult(null)
    setError('')
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <GrassIcon sx={{ fontSize: 40, color: '#2E7D32' }} />
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Crop Recommendation
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Enter your soil and environmental conditions to get the best crop recommendation.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Soil Nutrients
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Nitrogen (N)"
                      name="N"
                      type="number"
                      value={formData.N}
                      onChange={handleChange}
                      required
                      inputProps={{ min: 0, max: 200 }}
                      helperText="mg/kg"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Phosphorus (P)"
                      name="P"
                      type="number"
                      value={formData.P}
                      onChange={handleChange}
                      required
                      inputProps={{ min: 0, max: 200 }}
                      helperText="mg/kg"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Potassium (K)"
                      name="K"
                      type="number"
                      value={formData.K}
                      onChange={handleChange}
                      required
                      inputProps={{ min: 0, max: 200 }}
                      helperText="mg/kg"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Environmental Conditions
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Temperature"
                      name="temperature"
                      type="number"
                      value={formData.temperature}
                      onChange={handleChange}
                      required
                      inputProps={{ min: 0, max: 50, step: 0.1 }}
                      helperText="Celsius"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Humidity"
                      name="humidity"
                      type="number"
                      value={formData.humidity}
                      onChange={handleChange}
                      required
                      inputProps={{ min: 0, max: 100 }}
                      helperText="%"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="pH Level"
                      name="ph"
                      type="number"
                      value={formData.ph}
                      onChange={handleChange}
                      required
                      inputProps={{ min: 0, max: 14, step: 0.1 }}
                      helperText="0-14"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Rainfall"
                      name="rainfall"
                      type="number"
                      value={formData.rainfall}
                      onChange={handleChange}
                      required
                      inputProps={{ min: 0, max: 500 }}
                      helperText="mm"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{ flex: 1 }}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Recommendation'}
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={handleReset}
                        sx={{ flex: 0.3 }}
                      >
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

        <Grid item xs={12} md={5}>
          {result ? (
            <Card
              sx={{
                background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
                color: 'white',
                textAlign: 'center',
                py: 6,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                  Recommended Crop
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 700, mb: 3, textTransform: 'capitalize' }}>
                  {result}
                </Typography>
                <Chip
                  label="ML Powered Recommendation"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                  }}
                />
                <Box sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: 'white',
                      color: '#2E7D32',
                      '&:hover': { backgroundColor: '#f5f5f5' },
                    }}
                    onClick={handleReset}
                  >
                    Try Another
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ p: 4, textAlign: 'center', backgroundColor: '#E8F5E9' }}>
              <GrassIcon sx={{ fontSize: 64, color: '#2E7D32', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                Ready for Prediction
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fill in the form with your soil and environmental data to get crop recommendations.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Supported Crops:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                  {crops.slice(0, 8).map((crop) => (
                    <Chip key={crop} label={crop} size="small" />
                  ))}
                  <Chip label={`+${crops.length - 8} more`} size="small" />
                </Box>
              </Box>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default CropRecommendation
