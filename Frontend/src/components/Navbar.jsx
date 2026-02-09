import { Link } from "react-router-dom";
import Logo from "./Logo";
import Profile from "./Profile";



export default function Navbar({ navItems }) {
  return (
    <div className="flex flex-row items-center mb-6">
    <Logo />
      <nav>
        <ul className="flex flex-row gap-5 mx-5">
          {navItems.map((link, index) => (
            <li key={index}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Profile />


    </div>
  );
}
