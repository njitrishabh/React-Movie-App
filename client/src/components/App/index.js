import * as React from 'react';
//import Review from './Review';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing';
import Search from '../Search';
import Review from '../Review';
import FindTrailer from '../FindTrailer';

const App = () => {

  
  return (
    
      <Router>
      <div>
        <Routes>
          <Route path="/Search" element={<Search />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/FindTrailer" element={<FindTrailer />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
      </Router>
   
  );
}

export default App;