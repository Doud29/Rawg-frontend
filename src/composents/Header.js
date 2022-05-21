//import du css
import "./header.scss";
import rawglogo from "../svg/rawglogo.svg";

//------------------------------------------------------------------//
//------------------ // Composent Header // ------------------------//
//------------------------------------------------------------------//

const Header = () => {
  return (
    <div className="header-app">
      <div className="logo">
        <img src={rawglogo} alt="logo-rawg" />
      </div>
      <div className="header-rigth">
        <div className="favoris">My collection</div>
        <div className="login">Login</div>
      </div>
    </div>
  );
};

export default Header;
