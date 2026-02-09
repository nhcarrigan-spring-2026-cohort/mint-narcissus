import { Button } from "@/components/ui/button"

import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
    <BrowserRouter>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
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
      </Routes>
      <Button>Click me</Button>
    </BrowserRouter>
    </div>
  );
}

export default App
