import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./login.scss";
import "./signup.scss";

//----------------------------- import  icone(s) -------------------------//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

//-----------------------------// import logo //---------------------------//

import croixlogo from "../svg/croixlogo.svg";

const Login = ({ setUser, setUserPhotoProfile, setUserName }) => {
  const navigate = useNavigate();
  //----------------------------------// icone  //------------------------------------------//

  const comments = <FontAwesomeIcon icon={faMessage} />;
  const bookmark = <FontAwesomeIcon icon={faBookmark} />;
  const user = <FontAwesomeIcon icon={faUser} />;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:4000/login", {
        email: email,
        password: password,
      });
      console.log(response.data);
      setUser(response.data.token);
      setUserName(response.data.username);
      setUserPhotoProfile(response.data.avatar);
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="background-modal">
      <div className="modal-signup">
        <Link to="/">
          <img src={croixlogo} alt="fermer le signup" />
        </Link>

        <div className="bloc-left">
          <h2>How it works?</h2>
          <p>
            {user} {""}Log in to your free account to be able to get all
            features of Game pad
          </p>
          <p>
            {" "}
            {bookmark}
            {""} Add a game to your Collection{" "}
          </p>
          <p>
            {" "}
            {comments} {""} Leave a review for a game
          </p>
        </div>
        <div className="bloc-rigth">
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
              style={{ width: "98%" }}
              type="text"
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />{" "}
            <br />
            <input
              style={{ width: "97%" }}
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />{" "}
            <br />
            <input
              style={{
                width: "80%",
                backgroundColor: "#ff4655",
                color: "white",
              }}
              type="submit"
            />
            <Link
              className="alreadyanacount"
              to="/Signup"
              style={{
                textDecoration: "none",
                color: "grey",
                marginTop: 15,
                fontSize: 12,
              }}
            >
              <p>No account? Click here</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
