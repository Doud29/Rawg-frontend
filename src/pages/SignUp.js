import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.scss";

//----------------------------- import  icone(s) -------------------------//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

//-----------------------------// import logo //---------------------------//

import croixlogo from "../svg/croixlogo.svg";

const SignUp = ({ setUser, setUserName, setUserPhotoProfile }) => {
  const navigate = useNavigate();
  //----------------------------------// icone  //------------------------------------------//

  const comments = <FontAwesomeIcon icon={faMessage} />;
  const bookmark = <FontAwesomeIcon icon={faBookmark} />;
  const user = <FontAwesomeIcon icon={faUser} />;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState({});

  //--------------------------- // State Error // -----------------------------------------//

  const [emptyField, setEmptyField] = useState("");
  const [isEmailValid, setIsEmailValid] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState("");

  const handleSignUp = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();

      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatar);

      if (
        username !== "" ||
        email !== "" ||
        password !== "" ||
        confirmPassword !== ""
      ) {
        if (password === confirmPassword) {
          if (email.indexOf("@")) {
            console.log(formData);
            const response = await axios.post(
              "http://localhost:4000/SignUp",
              formData
            );
            console.log(response.data);
            if (response.data.token) {
              setUser(response.data.token);
              setUserName(response.data.username);
              setUserPhotoProfile(response.data.avatar);
              navigate("/");
            }
          } else {
            setIsEmailValid("vous devez entrer une adresse mail valide!");
          }
        } else {
          setIsPasswordValid(
            "Vous devez entrer un mot de passe identique dans les deux champs."
          );
        }
      } else {
        setEmptyField("vous devez remplir l'ensemble des champs.");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="background-modal">
      {isEmailValid !== "" && <p style={{ color: "red" }}>{isEmailValid}</p>}
      {isPasswordValid !== "" && (
        <p style={{ color: "red" }}>{isPasswordValid}</p>
      )}
      {emptyField !== "" && <p style={{ color: "red" }}>{emptyField}</p>}
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
            {""}Add a game to your Collection{" "}
          </p>
          <p>
            {" "}
            {comments} {""}Leave a review for a game
          </p>
        </div>
        <div className="bloc-rigth">
          <span>Sign up</span>
          <form onSubmit={handleSignUp}>
            <input
              style={{ width: "98%" }}
              type="text"
              placeholder="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />{" "}
            <br />
            <input
              style={{ width: "98%" }}
              type="text"
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />{" "}
            <br />
            <input
              style={{ width: "50%" }}
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />{" "}
            <input
              style={{ width: "45%" }}
              type="password"
              placeholder="confirm your password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />{" "}
            <br />
            <input
              style={{ width: "98%" }}
              type="file"
              onChange={(event) => setAvatar(event.target.files[0])}
            />{" "}
            <br />
            <input
              style={{
                width: "80%",
                backgroundColor: "#ff4655",
                color: "white",
              }}
              type="submit"
              value="Connexion"
            />
            <Link
              className="alreadyanacount"
              to="/login"
              style={{
                textDecoration: "none",
                color: "grey",
                marginTop: 10,
                fontSize: 12,
              }}
            >
              <p>Already an account? Click here</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
