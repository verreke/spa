import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Grid, Box } from "@mui/material";
import logo from '../logo.svg';

import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

import FreeIssueList from "./FreeIssueList";
import QuestionIssueList from "./QuestionIssueList";

function Dashboard() {
    return <div>
        <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box p={2}>
            <Carousel autoPlay infiniteLoop showThumbs={false}>
              <div>
                  <img src={image1} className="image-logo" alt="logo" />
              </div>
              <div>
                  <img src={image2} className="image-logo" alt="logo" />
              </div>
              <div>
                  <img src={image3} className="image-logo" alt="logo" />
              </div>
            </Carousel>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box p={2}>
            <FreeIssueList 
              header="자유게시판"
              repository={{ owner:`verreke`, name:`freeboard`}}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box p={2}>
            <QuestionIssueList 
              header="질문게시판"
              repository={{ owner:`verreke`, name:`questionboard`}}
            />
          </Box>
        </Grid>
        
      </Grid>
    </div>
}

export default Dashboard;