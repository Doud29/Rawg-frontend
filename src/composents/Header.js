//import du css
import "./header.scss";
import rawglogo from "../svg/rawglogo.svg";
import { Link, useNavigate } from "react-router-dom";

//------------------------------------------------------------------//
//------------------ // Composent Header // ------------------------//
//------------------------------------------------------------------//
const Header = ({ token, setUser, profileName, profilephoto }) => {
  const navigate = useNavigate();

  return (
    <div className="header-app">
      <Link className="logo" to="/">
        <div className="logo">
          <img src={rawglogo} alt="logo-rawg" />
        </div>
      </Link>
      {token === null ? (
        <div className="header-rigth" style={{ width: "auto" }}>
          <div
            style={{ opacity: 0.2 }}
            className="favoris"
            onClick={() => {
              alert("Vous devez être connecter pour accéder à vos favoris");
            }}
          >
            My collection
          </div>
          <Link
            className="login"
            to="/SignUp"
            style={{ textDecoration: "none" }}
          >
            <div className="login">Login</div>
          </Link>
        </div>
      ) : (
        <div className="header-rigth">
          <Link
            className="favoris"
            style={{ textDecoration: "none" }}
            to="/Favoris"
          >
            <div className="favoris">My collection</div>
          </Link>

          <Link
            className="login"
            to="/"
            style={{ textDecoration: "none" }}
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
          >
            <div className="login">Deconnexion</div>
          </Link>

          <div className="photo-profile">
            <img src={profilephoto} alt="profil" /> <p>{profileName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
