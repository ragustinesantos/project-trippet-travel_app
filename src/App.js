import React from 'react'
import {HashRouter, Routes, Route} from "react-router-dom"
import "./App.css"
import WeatherApp from './pages/Weather';
import Currency from './pages/Currency';

function App() {
  return (
    <HashRouter base="/">
      <Routes>
        <Route path="/" element={<WeatherApp />}/>
        <Route path="/Currency" element={<Currency />}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
