
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';

function App() {


  return (
    <BrowserRouter>
      <>
        <nav className='flex flex-row justify-center gap-7 top-0'>
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/services"}>Services</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route path='/services' element={<Services />} />
          <Route
            path="*"
            element={<h2>404: Page doesnt exsist</h2>}
          />
        </Routes>
        {/* Tested Tailwind works in app  */}

      </>
    </BrowserRouter>
  );
}

export default App
