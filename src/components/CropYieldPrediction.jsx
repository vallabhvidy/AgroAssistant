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
import ShowChartIcon from '@mui/icons-material/ShowChart'
import axios from 'axios'

const API_URL = 'https://pleat-gas-enigmatic.ngrok-free.dev'

const areas = [
  'Albania', 'Angola', 'Argentina', 'Australia', 'Austria', 'Azerbaijan',
  'Bangladesh', 'Belarus', 'Belgium', 'Brazil', 'Bulgaria', 'Cameroon',
  'Canada', 'Chile', 'China', 'Colombia', 'Croatia', 'Denmark',
  'Egypt', 'Estonia', 'Ethiopia', 'Finland', 'France', 'Germany',
  'Ghana', 'Greece', 'Hungary', 'India', 'Indonesia', 'Ireland',
  'Italy', 'Japan', 'Kazakhstan', 'Kenya', 'Latvia', 'Lithuania',
  'Madagascar', 'Malawi', 'Malaysia', 'Mali', 'Mauritania', 'Mexico',
  'Morocco', 'Mozambique', 'Nepal', 'Netherlands', 'New Zealand',
  'Niger', 'Nigeria', 'Norway', 'Pakistan', 'Peru', 'Philippines',
  'Poland', 'Portugal', 'Romania', 'Russia', 'Saudi Arabia', 'Senegal',
  'Slovenia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Sweden',
  'Switzerland', 'Tanzania', 'Thailand', 'Tunisia', 'Turkey',
  'Uganda', 'Ukraine', 'United Kingdom', 'United States of America',
  'Uruguay', 'Vietnam', 'Zambia', 'Zimbabwe'
]

const items = [
  'Maize', 'Potatoes', 'Rice, paddy', 'Sorghum', 'Soybeans', 'Wheat',
  'Sweet potatoes', 'Yams', 'Cassava', 'Barley', 'Rye', 'Oats',
  'Millet', 'Buckwheat', 'Quinoa', 'Fonio', 'Peas', 'Beans'
]

function CropYieldPrediction() {
  const [formData, setFormData] = useState({
    area: '',
    item: '',
    year: new Date().getFullYear(),
    avg_rainfall: '',
    pesticides: '',
    avg_temp: '',
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
      const response = await axios.post(`${API_URL}/predict-yield`, {
        area: formData.area,
        item: formData.item,
        year: parseInt(formData.year),
        avg_rainfall: parseFloat(formData.avg_rainfall),
        pesticides: parseFloat(formData.pesticides),
        avg_temp: parseFloat(formData.avg_temp),
      })
      setResult(response.data.predicted_yield_hg_ha)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to get prediction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      area: '',
      item: '',
      year: new Date().getFullYear(),
      avg_rainfall: '',
      pesticides: '',
      avg_temp: '',
    })
    setResult(null)
    setError('')
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <ShowChartIcon sx={{ fontSize: 40, color: '#F57C00' }} />
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Crop Yield Prediction
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Estimate crop yield based on location, crop type, and environmental factors.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Location & Crop</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Country/Region"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      required
                    >
                      {areas.map((a) => (
                        <MenuItem key={a} value={a}>{a}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Crop Type"
                      name="item"
                      value={formData.item}
                      onChange={handleChange}
                      required
                    >
                      {items.map((i) => (
                        <MenuItem key={i} value={i}>{i}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Year"
                      name="year"
                      type="number"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      inputProps={{ min: 1990, max: 2030 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" sx={{ mb: 2 }}>Environmental Factors</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Avg Rainfall (mm/year)"
                      name="avg_rainfall"
                      type="number"
                      value={formData.avg_rainfall}
                      onChange={handleChange}
                      required
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Pesticides (tonnes)"
                      name="pesticides"
                      type="number"
                      value={formData.pesticides}
                      onChange={handleChange}
                      required
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Avg Temperature (C)"
                      name="avg_temp"
                      type="number"
                      value={formData.avg_temp}
                      onChange={handleChange}
                      required
                      inputProps={{ min: -10, max: 50, step: 0.1 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{ flex: 1, backgroundColor: '#F57C00' }}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Predict Yield'}
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

        <Grid item xs={12} md={5}>
          {result !== null ? (
            <Card sx={{ background: 'linear-gradient(135deg, #F57C00 0%, #FFB74D 100%)', color: 'white', textAlign: 'center', py: 6 }}>
              <CardContent>
                <ShowChartIcon sx={{ fontSize: 64, mb: 2, opacity: 0.9 }} />
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                  Predicted Yield
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {result.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                  hg/ha
                </Typography>
                <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
                  <Typography variant="body2">
                    {formData.item} in {formData.area} ({formData.year})
                  </Typography>
                </Box>
                <Chip
                  label="Analytics"
                  sx={{ mt: 3, backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Box sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: 'white', color: '#F57C00', '&:hover': { backgroundColor: '#f5f5f5' } }}
                    onClick={handleReset}
                  >
                    Try Another
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ p: 4, textAlign: 'center', backgroundColor: '#FFF3E0' }}>
              <ShowChartIcon sx={{ fontSize: 64, color: '#F57C00', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                Enter Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fill in the location, crop type, and environmental factors to predict your expected yield.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Chip label="Data-Driven" size="small" sx={{ mr: 1 }} />
                <Chip label="hg/ha = hectogram/hectare" size="small" />
              </Box>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

const Divider = ({ sx }) => <div style={{ height: 1, backgroundColor: '#e0e0e0', margin: '16px 0', ...sx }} />

export default CropYieldPrediction
