import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Navbar from './components/Navbar'
import Home from './components/Home'
import CropRecommendation from './components/CropRecommendation'
import FertilizerRecommendation from './components/FertilizerRecommendation'
import RainfallPrediction from './components/RainfallPrediction'
import CropYieldPrediction from './components/CropYieldPrediction'
import DiseaseDetection from './components/DiseaseDetection'
import Statistics from './components/Statistics'

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crop" element={<CropRecommendation />} />
            <Route path="/fertilizer" element={<FertilizerRecommendation />} />
            <Route path="/rainfall" element={<RainfallPrediction />} />
            <Route path="/yield" element={<CropYieldPrediction />} />
            <Route path="/disease" element={<DiseaseDetection />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </Box>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: '#2E7D32',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Box sx={{ container: { xs: 'sm' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 2 }}>
              {/* <Box sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}>About</Box>
              <Box sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}>Help</Box>
              <Box sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}>Contact</Box> */}
            </Box>
            <Box sx={{ fontSize: 14, opacity: 0.8 }}>
              AgroAssistant - Smart Agricultural Intelligence
            </Box>
            <Box sx={{ fontSize: 12, opacity: 0.6, mt: 1 }}>
              Built for Modern Farming
            </Box>
          </Box>
        </Box>
      </Box>
    </BrowserRouter>
  )
}

export default App
