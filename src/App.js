import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Grid, Box } from "@mui/material";
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Freeboard from './components/Freeboard';
import Questionboard from './components/Questionboard';
import IssueDetail from './components/IssueDetail'
import CreateIssue from './components/CreateIssue';
import { useModal, ModalProvider } from './components/ModalContext';

function App() {
  return (
    <Router>
      <ModalProvider>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/freeboard" element={<Freeboard />}/>
            <Route path="/questionboard" element={<Questionboard />}/>
            <Route path="/issue/:id" element={<IssueDetail />} />
            <Route path="/createissue" element={<CreateIssue />} />
          </Routes>
        </div>
      </ModalProvider>
    </Router>
  );
}

export default App;
