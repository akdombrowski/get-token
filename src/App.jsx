import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const win = window;

function App() {
  const [token, setToken] = useState("");
  const re = /(?<=#.*)access_token=([^&])*/;

  const checkFragment = () => {
    return !!window.location.hash;
  };

  const checkQuery = () => {
    return !!window.location.search;
  };

  useEffect(() => {
    if (checkFragment()) {
      const hash = window.location.hash;
      const at = hash.match(re);
      setToken(at);
    }
  }, []);

  return (
    <>
      <div>
        <h1>{checkFragment() + ""}</h1>
        <h1>{checkQuery()}</h1>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <code>{token}</code>
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

export default App;
