
import './App.css'

import Navbar from './components/Navbar'
import Container from './components/Container'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';

function App() {


  return (
    <Container>
        <Navbar
          className="sticky"
          navItems={[
            { label: "Home", path: "/" },
            { label: "About", path: "/about" },
          ]}
        />

        

    </Container>
  );
}

export default App
