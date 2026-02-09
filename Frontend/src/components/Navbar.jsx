import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Profile from "./Profile";

export default function Navbar({ navItems }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6 md:p-0">
        <Logo />
        <nav className="hidden md:flex">
          <ul className="flex flex-row gap-5 mx-5">
            {navItems.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Profile />
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <nav className="md:hidden ">
          <ul className="flex flex-col py-4 px-6 gap-4">
            {navItems.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
