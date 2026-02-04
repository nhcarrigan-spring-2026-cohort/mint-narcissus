import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import '@fontsource-variable/playfair-display';
import '@fontsource-variable/inter';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="font-playfair">
        <p className="text-7xl">PlayFair 72px</p>
        <hr />
        <br />
        <p className="text-5xl font-playfair">PlayFair 48px</p>
        <hr />
        <br />
        <p className="text-3xl font-playfair">PlayFair 30px</p>
        <hr />
        <br />
        <p className="text-2xl">PlayFair 24px</p>
        <hr />
        <br />
        <p className="text-lg">PlayFair 18px</p>
        <hr />
        <br />
      </div>
      <div className="pt-4 font-inter">
        <p className="text-7xl">Inter 72px</p>
        <hr />
        <br />
        <p className="text-5xl">Inter 48px</p>
        <hr />
        <br />
        <p className="text-3xl">Inter 30px</p>
        <hr />
        <br />
        <p className="text-2xl">Inter 24px</p>
        <hr />
        <br />
        <p className="text-lg">Inter 18px</p>
        <hr />
        <br />
        <p className="text-base">Inter 16px</p>
        <hr />
        <br />
        <p className="text-sm">Inter 14px</p>
        <hr />
        <br />
      </div>
      <div className="flex flex-row">
        {" "}
        {/* Tested Tailwind works in app  */}
        <a
          href="https://vite.dev"
          target="_blank"
        >
          <img
            src={viteLogo}
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
        >
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App
