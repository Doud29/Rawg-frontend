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
  const [profileName, setProfileName] = useState(
    Cookies.get("userName") || null
  );
  const [profilephoto, setProfilePhoto] = useState(
    Cookies.get("photoProfile") || null
  );

  const [FavorisUpdate, setFavorisUpdate] = useState(
    Cookies.get("favoris") || null
  );

  //---------------------// Cookies pour récupérer le token et ainsi éviter de le perdre en state à chaque rafraichissement//---------------------------//
  const setUser = (token) => {
    if (token !== null) {
      Cookies.set("userToken", token, { expires: 10 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };
  //-------------------------------------// Cookies le nom utilisateur //-----------------------------------//

  const setUserName = (name) => {
    if (name !== null) {
      Cookies.set("userName", name, { expires: 10 });
    } else {
      Cookies.remove("userName");
    }
    setProfileName(name);
  };

  //-------------------------------------// Cookies l'image du profile //-----------------------------------//

  const setUserPhotoProfile = (pictureLink) => {
    if (pictureLink !== null) {
      Cookies.set("userName", pictureLink, { expires: 10 });
    } else {
      Cookies.remove("userName");
    }
    setProfilePhoto(pictureLink);
  };

  //-------------------------------------// Cookies la gestion des favoris //-----------------------------------//

  const setFavorisShow = (Gameinfos) => {
    if (Gameinfos !== null) {
      Cookies.set("favoris", Gameinfos, { expires: 10 });
    } else {
      Cookies.remove("favoris");
    }
    setFavorisUpdate(Gameinfos);
  };

  //-------------------------------------// Cookies la gestion des favoris //-----------------------------------//

  // const UpdateFavoris = (booleen) => {
  //   if (Gameinfos !== null) {
  //     Cookies.set("favoris", Gameinfos, { expires: 10 });
  //   } else {
  //     Cookies.remove("favoris");
  //   }
  //   setFavorisUpdate(booleen);
  // };

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
          <Route
            path="/"
            element={<Home token={token} profileName={profileName} />}
          />
          <Route
            path="/signup"
            element={
              <SignUp
                setUserName={setUserName}
                setUser={setUser}
                setProfileName={setProfileName}
                setUserPhotoProfile={setUserPhotoProfile}
                setFavorisShow={setFavorisShow}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setUserName={setUserName}
                setUser={setUser}
                setProfileName={setProfileName}
                setUserPhotoProfile={setUserPhotoProfile}
                setFavorisShow={setFavorisShow}
                profileName={profileName}
              />
            }
          />
          <Route path="/game/:id" element={<Game />} />
          <Route
            path="/favoris"
            element={
              <Favoris
                token={token}
                setUserName={setUserName}
                FavorisUpdate={FavorisUpdate}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
