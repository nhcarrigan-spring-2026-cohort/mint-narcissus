import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageNotFound from "../pages/PageNotFound";
import { TooltipProvider } from "../components/ui/tooltip";

export default function AppLayout({ navItems }) {
  return (
    <BrowserRouter>
      {/* shadcn docs say not to forget tooltip container for whole app - so I added it here */}
      <TooltipProvider>
        {/* I am using this flex box to keep the footer component at the bottom */}
        <div className='flex flex-col min-h-screen '>
          <Navbar navItems={navItems} />
          {/* using "grow" to make page takeup all the extra space, keep footer in its place. */}
          <main className='grow'>
            <Routes>
              {navItems.map((link, index) => (
                <Route key={index} path={link.path} element={link.element} />
              ))}
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </TooltipProvider>
    </BrowserRouter>
  );
}
