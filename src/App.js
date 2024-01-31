import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import "./App.css"
import WeatherApp from './pages/Weather';
import Currency from './pages/Currency';

function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<WeatherApp />}/>
        <Route path="/Currency" element={<Currency />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
