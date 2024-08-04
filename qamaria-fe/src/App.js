import React from 'react';
import './App.css';
import Layout from './Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Team from './components/Routes/Team';
import ReservationPage  from "../src/components/Routes/Reservstion/ReservstionPage"
import CateringPage from "./components/Routes/CateringPage/CateringPage"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        {/* Define additional routes here as needed */}
        <Route path="/Team" element={<Team />} /> 
        <Route path="/reservation" element={<ReservationPage/>} />
        <Route path="/catering" element={<CateringPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
