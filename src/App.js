import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import FeaturedWorks from './components/FeaturedWorks';
import './App.css';

function App() {
  return (
    <Router basename="/personal-portfolio-wesbite">
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Portfolio />
                <About />
                <Contact />
              </>
            }
          />
          <Route path="/featured-works" element={<FeaturedWorks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
