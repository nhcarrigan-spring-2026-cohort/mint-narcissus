import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Page404 from "../pages/Page404";


export default function AppLayout({ navItems }) {
  return (
    <BrowserRouter>
      {/* I am using this flex box to keep the footer component at the bottom */}
      <div className="flex flex-col min-h-screen ">
        <Navbar navItems={navItems} />
        {/* using "grow" to make page takeup all the extra space, keep footer in its place. */}
        <main className="grow">
          <Routes>
            {navItems.map((link, index) => (
              <Route
                key={index}
                path={link.path}
                element={link.element}
              />
            ))}
            <Route
              path="*"
              element={<Page404 />}
            />
          </Routes>
        </main>

        <Footer />    

      </div>
    </BrowserRouter>
  );
}
