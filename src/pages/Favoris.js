//------------------------------- import css ------------------------------//
import "./favoris.scss";
import croixlogo from "../svg/croixlogo.svg";

//------------------------- import de nos packages ------------------------//
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

const Favoris = ({ token }) => {
  // ---------------------------------------------------------------------------------------------------------------------------- //
  // -------------------------------------- // DELETEE FAVORIS DE LA BASE DE DONNEES // ------------------------------------------ //
  // ---------------------------------------------------------------------------------------------------------------------------- //

  // const deleteFavoris = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:4000/deletefavoris",
  //       { id: idMovie },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };
  //-----------------------// Use Effect //--------------------------------//
  // ce useeffect permet de catccher la bonne valeur du
  // useEffect(() => {
  //   if (idMovie) {
  //     deleteFavoris();
  //   }
  //   console.log(idMovie);
  // }, [idMovie]);

  // ---------------------------------------------------------------------------------------------------------------------------- //
  // -------------------------------------- // REQUETE AU PREMIER RENDER DE LA PAGE // ------------------------------------------ //
  // ---------------------------------------------------------------------------------------------------------------------------- //
  // console.log(Cookies.get("userToken"));

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Delete, setDelete] = useState(false);
  const [getId, setGetId] = useState("");
  const [favorisUpdate, setFavorisUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("userToken");

        console.log(token);
        //requête favoriss
        const response = await axios.post("http://localhost:4000/showfavoris", {
          token: token,
        });
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const DeleteFavoris = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/deletefavoris",
          {
            _id: getId,
          }
        );
      } catch (error) {
        console.log(error.response);
      }
    };
    DeleteFavoris();
  }, [Delete]);

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
                  setGetId(item._id);
                  setDelete(true);
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
