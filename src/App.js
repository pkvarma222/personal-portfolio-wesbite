import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import FeaturedWorks from './components/FeaturedWorks';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<><Hero /><Portfolio /><About /><Contact /></>} />
          <Route path="/featured-works" element={<FeaturedWorks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;