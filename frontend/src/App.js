import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import { useState,useEffect } from "react";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Navbar from "./components/Navbar";
import ViewPDF from "./pages/ViewPDF";
import Profile from "./pages/Profile";

function App(){

  const [token,setToken] = useState(null);
  const [dark,setDark] = useState(false);

  useEffect(()=>{
    const t = localStorage.getItem("token");
    if(t) setToken(t);
  },[]);

  useEffect(()=>{
    document.body.style.background =
      dark ? "#111827" : "#f3f4f6";

    document.body.style.color =
      dark ? "white" : "black";
  },[dark]);

  return(
    <BrowserRouter>

      {token && (
        <Navbar
          setToken={setToken}
          dark={dark}
          setDark={setDark}
        />
      )}

      <Routes>

        <Route
          path="/"
          element={
            token
            ? <Navigate to="/dashboard"/>
            : <Auth setToken={setToken}/>
          }
        />

        <Route
          path="/dashboard"
          element={token ? <Dashboard/> : <Navigate to="/"/>}
        />

        <Route
          path="/upload"
          element={token ? <Upload/> : <Navigate to="/"/>}
        />

        <Route
          path="/view/:file"
          element={<ViewPDF/>}
        />

        <Route
          path="/profile"
          element={<Profile/>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
