import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "./composents/Header";
import Home from "./pages/Home";
import Game from "./pages/Game";
import SignUp from "./pages/SignUp";
import Favoris from "./pages/Favoris";
import Login from "./pages/Login";
import Footer from "./composents/Footer";
import { useState } from "react";

function App() {
  //state pour connexion
  // const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const [profileName, setProfileName] = useState("");
  const [profilephoto, setProfilePhoto] = useState("");
  const [favoris, setFavoris] = useState("");

  const setUser = (token) => {
    if (token !== null) {
      Cookies.set("userToken", token, { expires: 10 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };
  return (
    <Router>
      <div className="app">
        <Header
          token={token}
          setUser={setUser}
          profileName={profileName}
          profilephoto={profilephoto}
        />
        <Routes>
          <Route path="/" element={<Home token={token} />} />
          <Route
            path="/signup"
            element={
              <SignUp
                setUser={setUser}
                setProfileName={setProfileName}
                setProfilePhoto={setProfilePhoto}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setUser={setUser}
                setProfileName={setProfileName}
                setProfilePhoto={setProfilePhoto}
              />
            }
          />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/favoris" element={<Favoris token={token} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
