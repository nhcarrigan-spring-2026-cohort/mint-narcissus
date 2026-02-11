import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

import OutfitGallery from './components/OutfitGallery';
import ComponentPreview from './pages/ComponentPreview';




function App() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center'>
      <BrowserRouter>
        <nav className='flex flex-wrap gap-3'>
          <Link to={'/'}>Home</Link>
          <Link to={'/about'}>About</Link>
          <Link to={'/componentPreview'}>Component Preview</Link>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='componentPreview' element={<ComponentPreview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
