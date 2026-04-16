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
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import ScienceIcon from '@mui/icons-material/Science'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import axios from 'axios'

const API_URL = 'https://pleat-gas-enigmatic.ngrok-free.dev'

const soilTypes = ['Clay', 'Sandy', 'Silt', 'Loam', 'Peat', 'Chalk']
const cropTypes = ['Cotton', 'Maize', 'Wheat', 'Rice', 'Potato', 'Tomato', 'Sugarcane', 'Soybean']
const growthStages = ['Sowing', 'Vegetative', 'Flowering', 'Harvest']
const seasons = ['Kharif', 'Rabi', 'Zaid']
const irrigationTypes = ['Canal', 'Sprinkler', 'Drip', 'Rainfed', 'Tubewell']
const previousCrops = ['Wheat', 'Potato', 'Maize', 'Rice', 'Tomato', 'Sugarcane', 'Cotton']
const regions = ['North', 'South', 'East', 'West', 'Central']

function FertilizerRecommendation() {
  const [formData, setFormData] = useState({
    soil_type: '',
    soil_ph: '',
    soil_moisture: '',
    organic_carbon: '',
    electrical_conductivity: '',
    nitrogen_level: '',
    phosphorus_level: '',
    potassium_level: '',
    temperature: '',
    humidity: '',
    rainfall: '',
    crop_type: '',
    crop_growth_stage: '',
    season: '',
    irrigation_type: '',
    previous_crop: '',
    region: '',
    fertilizer_last_season: '',
    yield_last_season: '',
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
      const response = await axios.post(`${API_URL}/predict-fertilizer`, {
        soil_type: formData.soil_type,
        soil_ph: parseFloat(formData.soil_ph),
        soil_moisture: parseFloat(formData.soil_moisture),
        organic_carbon: parseFloat(formData.organic_carbon),
        electrical_conductivity: parseFloat(formData.electrical_conductivity),
        nitrogen_level: parseFloat(formData.nitrogen_level),
        phosphorus_level: parseFloat(formData.phosphorus_level),
        potassium_level: parseFloat(formData.potassium_level),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        rainfall: parseFloat(formData.rainfall),
        crop_type: formData.crop_type,
        crop_growth_stage: formData.crop_growth_stage,
        season: formData.season,
        irrigation_type: formData.irrigation_type,
        previous_crop: formData.previous_crop,
        region: formData.region,
        fertilizer_last_season: parseFloat(formData.fertilizer_last_season),
        yield_last_season: parseFloat(formData.yield_last_season),
      })
      setResult(response.data.recommended_fertilizer)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to get prediction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      soil_type: '', soil_ph: '', soil_moisture: '', organic_carbon: '',
      electrical_conductivity: '', nitrogen_level: '', phosphorus_level: '',
      potassium_level: '', temperature: '', humidity: '', rainfall: '',
      crop_type: '', crop_growth_stage: '', season: '', irrigation_type: '',
      previous_crop: '', region: '', fertilizer_last_season: '', yield_last_season: '',
    })
    setResult(null)
    setError('')
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <ScienceIcon sx={{ fontSize: 40, color: '#795548' }} />
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Fertilizer Recommendation
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Get personalized fertilizer recommendations based on your soil and crop conditions.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 600 }}>Soil Properties</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField select fullWidth label="Soil Type" name="soil_type" value={formData.soil_type} onChange={handleChange} required>
                          {soilTypes.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Soil pH" name="soil_ph" type="number" value={formData.soil_ph} onChange={handleChange} required inputProps={{ step: 0.1 }} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Soil Moisture (%)" name="soil_moisture" type="number" value={formData.soil_moisture} onChange={handleChange} required />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Organic Carbon (%)" name="organic_carbon" type="number" value={formData.organic_carbon} onChange={handleChange} required inputProps={{ step: 0.01 }} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Electrical Conductivity" name="electrical_conductivity" type="number" value={formData.electrical_conductivity} onChange={handleChange} required />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Region" name="region" select value={formData.region} onChange={handleChange} required>
                          {regions.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                        </TextField>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 600 }}>Nutrient Levels</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <TextField fullWidth label="Nitrogen (N)" name="nitrogen_level" type="number" value={formData.nitrogen_level} onChange={handleChange} required />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField fullWidth label="Phosphorus (P)" name="phosphorus_level" type="number" value={formData.phosphorus_level} onChange={handleChange} required />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField fullWidth label="Potassium (K)" name="potassium_level" type="number" value={formData.potassium_level} onChange={handleChange} required />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 600 }}>Environmental Conditions</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <TextField fullWidth label="Temperature (C)" name="temperature" type="number" value={formData.temperature} onChange={handleChange} required />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField fullWidth label="Humidity (%)" name="humidity" type="number" value={formData.humidity} onChange={handleChange} required />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField fullWidth label="Rainfall (mm)" name="rainfall" type="number" value={formData.rainfall} onChange={handleChange} required />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 600 }}>Crop Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField select fullWidth label="Crop Type" name="crop_type" value={formData.crop_type} onChange={handleChange} required>
                          {cropTypes.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField select fullWidth label="Growth Stage" name="crop_growth_stage" value={formData.crop_growth_stage} onChange={handleChange} required>
                          {growthStages.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField select fullWidth label="Season" name="season" value={formData.season} onChange={handleChange} required>
                          {seasons.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField select fullWidth label="Irrigation Type" name="irrigation_type" value={formData.irrigation_type} onChange={handleChange} required>
                          {irrigationTypes.map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField select fullWidth label="Previous Crop" name="previous_crop" value={formData.previous_crop} onChange={handleChange} required>
                          {previousCrops.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                        </TextField>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 600 }}>Last Season Data</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Fertilizer Used Last Season (kg/ha)" name="fertilizer_last_season" type="number" value={formData.fertilizer_last_season} onChange={handleChange} required />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Yield Last Season (t/ha)" name="yield_last_season" type="number" value={formData.yield_last_season} onChange={handleChange} required inputProps={{ step: 0.1 }} />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ flex: 1, backgroundColor: '#795548' }}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Recommendation'}
                  </Button>
                  <Button variant="outlined" size="large" onClick={handleReset}>Reset</Button>
                </Box>

                {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          {result ? (
            <Card sx={{ background: 'linear-gradient(135deg, #795548 0%, #A1887F 100%)', color: 'white', textAlign: 'center', py: 6 }}>
              <CardContent>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>Recommended Fertilizer</Typography>
                <Typography variant="h2" sx={{ fontWeight: 700, mb: 3 }}>{result}</Typography>
                <Chip label="Smart Farming" sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                <Box sx={{ mt: 4 }}>
                  <Button variant="contained" sx={{ backgroundColor: 'white', color: '#795548', '&:hover': { backgroundColor: '#f5f5f5' } }} onClick={handleReset}>
                    Try Another
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ p: 4, textAlign: 'center', backgroundColor: '#EFEBE9' }}>
              <ScienceIcon sx={{ fontSize: 64, color: '#795548', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>Fill the Form</Typography>
              <Typography variant="body2" color="text.secondary">
                Expand the sections above to enter your soil and crop details for personalized fertilizer recommendations.
              </Typography>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default FertilizerRecommendation
