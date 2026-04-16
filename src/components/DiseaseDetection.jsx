import { useState, useCallback } from 'react'
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Grid,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material'
import { useDropzone } from 'react-dropzone'
import BugReportIcon from '@mui/icons-material/BugReport'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import axios from 'axios'

const API_URL = 'https://pleat-gas-enigmatic.ngrok-free.dev'

function DiseaseDetection() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      setResult(null)
      setError('')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
  })

  const handleSubmit = async () => {
    if (!file) return

    setLoading(true)
    setError('')
    setResult(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post(`${API_URL}/predict-disease`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to detect disease. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    setError('')
  }

  const formatDisease = (disease) => {
    const parts = disease.split('__')
    if (parts.length === 2) {
      return { crop: parts[0], condition: parts[1].replace(/_/g, ' ') }
    }
    return { crop: 'Unknown', condition: disease }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <BugReportIcon sx={{ fontSize: 40, color: '#D32F2F' }} />
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Plant Disease Detection
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Upload a plant leaf image to detect diseases using advanced image recognition.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box
                {...getRootProps()}
                sx={{
                  border: '2px dashed',
                  borderColor: isDragActive ? '#2E7D32' : '#ccc',
                  borderRadius: 3,
                  p: 6,
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: isDragActive ? '#E8F5E9' : '#fafafa',
                  transition: 'all 0.3s ease',
                  '&:hover': { borderColor: '#2E7D32', backgroundColor: '#E8F5E9' },
                }}
              >
                <input {...getInputProps()} />
                {preview ? (
                  <Box>
                    <img
                      src={preview}
                      alt="Preview"
                      style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8, objectFit: 'contain' }}
                    />
                    <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                      {file?.name}
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <CloudUploadIcon sx={{ fontSize: 64, color: '#2E7D32', mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {isDragActive ? 'Drop the image here' : 'Drag & drop an image'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      or click to select a file
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                      Supports: JPG, PNG, WEBP (max 10MB)
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  disabled={!file || loading}
                  onClick={handleSubmit}
                  sx={{ flex: 1, backgroundColor: '#D32F2F' }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Detect Disease'}
                </Button>
                <Button variant="outlined" size="large" onClick={handleReset}>
                  Clear
                </Button>
              </Box>

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
            <Card sx={{ background: 'linear-gradient(135deg, #D32F2F 0%, #EF5350 100%)', color: 'white', py: 4 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <BugReportIcon sx={{ fontSize: 64, mb: 2, opacity: 0.9 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  Detection Result
                </Typography>
                <Box sx={{ mt: 3, p: 3, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
                  <Typography variant="caption" sx={{ opacity: 0.8, textTransform: 'uppercase', letterSpacing: 1 }}>
                    {formatDisease(result.disease).crop}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, mt: 1, textTransform: 'capitalize' }}>
                    {formatDisease(result.disease).condition}
                  </Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Confidence
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {result.confidence}%
                  </Typography>
                </Box>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <Chip label="Computer Vision" sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                  <Chip label="Computer Vision" sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                </Box>
                <Button
                  variant="contained"
                  sx={{ mt: 4, backgroundColor: 'white', color: '#D32F2F', '&:hover': { backgroundColor: '#f5f5f5' } }}
                  onClick={handleReset}
                >
                  Try Another Image
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ p: 4, textAlign: 'center', backgroundColor: '#FFEBEE', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <BugReportIcon sx={{ fontSize: 80, color: '#D32F2F', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Plant Disease Detection
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Upload a clear image of a plant leaf to detect potential diseases.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                <Chip label="Tomato" size="small" sx={{ m: 0.5 }} />
                <Chip label="Potato" size="small" sx={{ m: 0.5 }} />
                <Chip label="Pepper" size="small" sx={{ m: 0.5 }} />
                <Chip label="Apple" size="small" sx={{ m: 0.5 }} />
                <Chip label="Grape" size="small" sx={{ m: 0.5 }} />
                <Chip label="Corn" size="small" sx={{ m: 0.5 }} />
                <Chip label="+more" size="small" sx={{ m: 0.5 }} />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 3 }}>
                Tip: Take a close-up photo of the affected leaf for best results
              </Typography>
            </Card>
          )}
        </Grid>
      </Grid>

      <Box sx={{ mt: 6, p: 4, backgroundColor: '#f5f5f5', borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Tips for Best Results
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              1. Use clear, well-lit images of plant leaves
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              2. Include the affected area clearly in frame
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              3. Avoid blurry or out-of-focus images
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default DiseaseDetection
