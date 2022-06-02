//------------------------------- import css ------------------------------//
import "./favoris.scss";
import croixlogo from "../svg/croixlogo.svg";

//------------------------- import de nos packages ------------------------//

import axios from "axios";
import { useEffect, useState } from "react";

const Favoris = ({ token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [idMovie, setIdMovie] = useState("");

  // ---------------------------------------------------------------------------------------------------------------------------- //
  // -------------------------------------- // DELETEE FAVORIS DE LA BASE DE DONNEES // ------------------------------------------ //
  // ---------------------------------------------------------------------------------------------------------------------------- //

  const deleteFavoris = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/deletefavoris",
        idMovie,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  // ---------------------------------------------------------------------------------------------------------------------------- //
  // -------------------------------------- // REQUETE AU PREMIER RENDER DE LA PAGE // ------------------------------------------ //
  // ---------------------------------------------------------------------------------------------------------------------------- //

  useEffect(() => {
    const fetchData = async () => {
      try {
        //requête favoriss
        const response = await axios.get("http://localhost:4000/showfavoris", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token]);

  return isLoading ? (
    <div className="home-app">
      <h1>En cours de chargement</h1>
    </div>
  ) : (
    <div className="favoris-app">
      <div className="carroussel">
        {data.map((item, index) => {
          return (
            <div key={index} className="bloc-image">
              <img
                className="croix"
                src={croixlogo}
                alt="jeux"
                onClick={() => {
                  setIdMovie(item.idMovie);
                  console.log(idMovie);
                  deleteFavoris();
                }}
              />
              <div className="titre">{item.nameGame}</div>
              <img src={item.image} alt="game-favoris" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favoris;
