import * as React from 'react';

//import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Route, Link, Routes } from "react-router-dom";
import Landing from '../Landing';
import Search from '../Search';
import Review from '../Review';
import FindTrailer from '../FindTrailer';
import Navigation from '../Navigation';

const App = () => {

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Review" element={<Review />} />
        <Route path="/FindTrailer" element={<FindTrailer />} />
        {/* <Route path="*" element={<404Page />} /> */}
      </Routes>

    </>


  );
}

export default App;