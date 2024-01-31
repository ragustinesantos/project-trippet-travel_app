import React from 'react'
import {Routes, Route} from "react-router-dom"
import "./App.css"
import WeatherApp from './pages/Weather';
import Currency from './pages/Currency';

function App() {
  return (
      <Routes>
        <Route path="/" element={<WeatherApp />}/>
        <Route path="/Currency" element={<Currency />}/>
      </Routes>
  );
}

export default App;
