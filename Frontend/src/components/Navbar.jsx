export default function Navbar({ navItems }) {
  return (
    <nav>
      <div>
        <ul>
          {navItems.map((link, index) => (
            <li key={index}>
              <a href={link.path}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
