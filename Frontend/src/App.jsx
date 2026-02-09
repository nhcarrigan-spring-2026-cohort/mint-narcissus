import "./App.css";
import Container from "./components/Container";

/* Page Components */
import Browse from "./pages/Browse";
import Saved from "./pages/Saved";
import Messages from "./pages/Messages";


/* Array passed to Container.jsx to initiate Links */
const navItems = [
  { label: "Browse", path: "/browse", element: <Browse /> },
  { label: "Saved", path: "/saved", element: <Saved /> },
  { label: "Messages", path: "/messages", element: <Messages /> },
];

function App() {
  /* Maybe add a footer section aswell later */
  return <Container navItems={navItems}></Container>;
}

export default App;
