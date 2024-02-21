import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const win = window;

function App() {
  const [token, setToken] = useState("");
  const re_at = /(?<=#.*)access_token=([^&])*/;
  const re_id = /(?<=#.*)access_token=([^&])*/;
  const re_code = /(?<=#.*)access_token=([^&])*/;

  const checkFragment = () => {
    return !!window.location.hash;
  };

  const checkQuery = () => {
    return !!window.location.search;
  };

  const codeXchange = async (code) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Basic ZTFkYTdlNjAtMDE2OS00MDUyLTg2OGYtMWRmM2ZiZTg4OTdhOkl2UGZXYUlLMnJfZE41d0JqS1AxdmRxX2NvVi14US03UGJTSVhaMkhvQTRvWlkxM35QWVNNZWhJS2tHcUwxSkk=",
    );
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("code", code);
    urlencoded.append(
      "redirect_uri",
      "http://localhost:" + import.meta.env.BASE,
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const res = await fetch(
        "https://auth.pingone.com/ee2af24a-1bd3-47b9-b958-506f3bbe0155/as/token",
        requestOptions,
      );

      const json = await res.json();

      setToken(json);
    } catch (err) {
      console.error("token exchange failed:");
      console.error(err);
    }
  };

  useEffect(() => {
    if (checkFragment()) {
      const hash = window.location.hash;
      const at = hash.match(re_at);
      setToken(at);
    } else if (checkQuery()) {
      const query = window.location.search;
      const code = hash.match(re_code);
      const getToken = async (code) => {
        return await codeXchange(code);
      };
      const at = getToken(code);
      setToken(at);
    } else {
      window.location =
        "https://auth.pingone.com/ee2af24a-1bd3-47b9-b958-506f3bbe0155/as/authorize?response_type=token&client_id=05db38c4-1555-4a4e-a09b-9baccd1a53ee&scope=openid%20profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000";
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
