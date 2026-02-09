import { BrowserRouter } from "react-router-dom";

export default function Container({ children }) {
  return (
    <BrowserRouter>
      <div>
        <main>{children}</main>
      </div>
    </BrowserRouter>
  );
}
