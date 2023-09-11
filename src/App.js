import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Grid, Box } from "@mui/material";
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Freeboard from './components/Freeboard';
import Questionboard from './components/Questionboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/freeboard" element={<Freeboard />}/>
        <Route path="/questionboard" element={<Questionboard />}/>
      </Routes>
    </Router>
  );
}

export default App;
