import { Link, Route, Routes } from "react-router-dom";




export default function Navbar({ navItems }) {
  return (
    <>
      <nav>
        <ul>
          {navItems.map((link, index) => (
            <li key={index}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      
        <Routes>

          {navItems.map((link, index) => (

            <Route
              key={index}
              path={link.path}
              element={<PageComponent />}
            />
          ))}
        </Routes>

    </>
  );
}
