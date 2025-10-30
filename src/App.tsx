import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CarList from './components/CarList'


function App() {
  return (
    <>
      <div style={{ width: '90%', margin: '0 auto' }}>
        <AppBar position="static">
          <Toolbar sx={{ paddingLeft: 2, paddingRight: 2 }}>
            <Typography variant="h6">Car Shop</Typography>
          </Toolbar>
        </AppBar>
      </div>
    <Container maxWidth="xl">
      <CssBaseline />
      <CarList />
    </Container>
    </>
  )
}

export default App