import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Grid, Box } from "@mui/material";
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Freeboard from './components/Freeboard';
import Questionboard from './components/Questionboard';
import FreeIssueDetail from './components/FreeIssueDetail'
import QuestionIssueDetail from './components/QuestionIssueDetail';
import CreateFreeIssue from './components/CreateFreeIssue';
import CreateQuestionIssue from './components/CreateQuestionIssue';
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
            <Route path="/freeissue/:id" element={<FreeIssueDetail />} />
            <Route path="/questionissue/:id" element={<QuestionIssueDetail />} />
            <Route path="/createfreeissue" element={<CreateFreeIssue />} />
            <Route path="/createquestionissue" element={<CreateQuestionIssue />} />
          </Routes>
        </div>
      </ModalProvider>
    </Router>
  );
}

export default App;
