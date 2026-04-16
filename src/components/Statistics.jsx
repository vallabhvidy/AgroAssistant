import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChart'
import GrassIcon from '@mui/icons-material/Grass'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import ScienceIcon from '@mui/icons-material/Science'
import axios from 'axios'

const API_URL = 'https://pleat-gas-enigmatic.ngrok-free.dev'

function Statistics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStatistics()
  }, [])

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`${API_URL}/statistics`)
      setData(response.data)
    } catch (err) {
      setError('Failed to load statistics')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading statistics...</Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Container>
    )
  }

  const formatNumber = (num) => {
    if (typeof num === 'number') {
      return num.toLocaleString('en-IN')
    }
    return num
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <BarChartIcon sx={{ fontSize: 40, color: '#2E7D32' }} />
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Agricultural Statistics
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Explore insights and trends from agricultural datasets across India.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <GrassIcon sx={{ fontSize: 36, color: '#2E7D32' }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Crop Data
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ p: 2, backgroundColor: '#E8F5E9', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                      {formatNumber(data?.crops?.total_records)}
                    </Typography>
                    <Typography variant="caption">Total Records</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 2, backgroundColor: '#E8F5E9', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                      {formatNumber(data?.crops?.total_crops)}
                    </Typography>
                    <Typography variant="caption">Crop Types</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 2, backgroundColor: '#E8F5E9', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                      {formatNumber(data?.crops?.total_states)}
                    </Typography>
                    <Typography variant="caption">States</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 2, backgroundColor: '#E8F5E9', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                      {formatNumber(data?.crops?.total_districts)}
                    </Typography>
                    <Typography variant="caption">Districts</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
                Top Crops by Frequency
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {Object.entries(data?.crops?.top_crops_by_frequency || {}).slice(0, 6).map(([crop, count]) => (
                  <Chip
                    key={crop}
                    label={`${crop} (${count})`}
                    size="small"
                    sx={{ m: 0.25, backgroundColor: '#E8F5E9' }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <ScienceIcon sx={{ fontSize: 36, color: '#795548' }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Fertilizer Data
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box sx={{ p: 2, backgroundColor: '#EFEBE9', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#795548' }}>
                      {formatNumber(data?.fertilizers?.overall_avg_N)}
                    </Typography>
                    <Typography variant="caption">Avg N</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ p: 2, backgroundColor: '#EFEBE9', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#795548' }}>
                      {formatNumber(data?.fertilizers?.overall_avg_P)}
                    </Typography>
                    <Typography variant="caption">Avg P</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ p: 2, backgroundColor: '#EFEBE9', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#795548' }}>
                      {formatNumber(data?.fertilizers?.overall_avg_K)}
                    </Typography>
                    <Typography variant="caption">Avg K</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
                Fertilizer pH Range
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                <Chip
                  label={`Min: ${data?.fertilizers?.ph_range?.min || 'N/A'}`}
                  size="small"
                  sx={{ m: 0.25, backgroundColor: '#EFEBE9' }}
                />
                <Chip
                  label={`Max: ${data?.fertilizers?.ph_range?.max || 'N/A'}`}
                  size="small"
                  sx={{ m: 0.25, backgroundColor: '#EFEBE9' }}
                />
                <Chip
                  label={`Avg: ${data?.fertilizers?.ph_range?.avg || 'N/A'}`}
                  size="small"
                  sx={{ m: 0.25, backgroundColor: '#EFEBE9' }}
                />
              </Box>

              <Box sx={{ mt: 3, p: 2, backgroundColor: '#EFEBE9', borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#795548' }}>
                  {formatNumber(data?.fertilizers?.total_fertilizer_records)}
                </Typography>
                <Typography variant="caption">Total Fertilizer Records</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <WaterDropIcon sx={{ fontSize: 36, color: '#0288D1' }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Rainfall Data
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ p: 2, backgroundColor: '#E3F2FD', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#0288D1' }}>
                      {formatNumber(data?.rainfall?.avg_yearly_rainfall_mm)} mm
                    </Typography>
                    <Typography variant="caption">Avg Yearly</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 2, backgroundColor: '#E3F2FD', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#0288D1' }}>
                      {formatNumber(data?.rainfall?.avg_kharif_rainfall_mm)} mm
                    </Typography>
                    <Typography variant="caption">Avg Kharif</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 2, backgroundColor: '#E3F2FD', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#0288D1' }}>
                      {formatNumber(data?.rainfall?.avg_rabi_rainfall_mm)} mm
                    </Typography>
                    <Typography variant="caption">Avg Rabi</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 2, backgroundColor: '#E3F2FD', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#0288D1' }}>
                      {formatNumber(data?.rainfall?.avg_summer_rainfall_mm)} mm
                    </Typography>
                    <Typography variant="caption">Avg Summer</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
                Rainfall Range
              </Typography>
              <Box sx={{ p: 2, backgroundColor: '#E3F2FD', borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Max: <strong>{formatNumber(data?.rainfall?.max_yearly_rainfall_mm)} mm</strong>
                </Typography>
                <Typography variant="body2">
                  Min: <strong>{formatNumber(data?.rainfall?.min_yearly_rainfall_mm)} mm</strong>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Top States by Crop Production
              </Typography>
              <Grid container spacing={3}>
                {Object.entries(data?.crops?.top_states_by_production || {}).map(([state, production], index) => (
                  <Grid item xs={12} sm={6} md={2.4} key={state}>
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: ['#E8F5E9', '#FFF3E0', '#E3F2FD', '#F3E5F5', '#ECEFF1'][index],
                        borderRadius: 2,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        #{index + 1}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                        {state.replace(/_/g, ' ').toLowerCase()}
                      </Typography>
                      <Typography variant="caption">
                        {formatNumber(Math.round(production))} units
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Statistics
