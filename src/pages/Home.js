//------------------------- import de nos packages ------------------------//
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; //rappel

//----------------------------- import  composent -----------------------------//
import Displaywrap from "../composents/Displaywrap";
import Displaycolumn from "../composents/Displaycolumn";

import axios from "axios";
//----------------------------- import  icone(s) -------------------------//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

//----------------------------- import  scss -----------------------------//
import "./home.scss";
//-------------------------- import de la photo --------------------------//
import rawglogo from "../svg/rawglogo.svg";

const Home = ({ token }) => {
  //ICONS pagination :
  const chevronsLeft = <FontAwesomeIcon icon={faChevronLeft} />;
  const chevronsRigth = <FontAwesomeIcon icon={faChevronRight} />;
  const loupe = <FontAwesomeIcon icon={faMagnifyingGlass} />;

  // SEARCH dans la barre de recherche:
  const [search, setSearch] = useState("");
  //SEARCH A GAME sur le Onclick pour éviter trop de requête:
  const [searchagame, setSearchaGame] = useState("");
  // PAGE : pagination
  const [page, setPage] = useState(1);
  // DATA : récupére l'objet de l'api.
  const [data, setData] = useState([]);
  //iSloading : nous permettra de savoir si la requête a bien fonctionné. cela nous permettra de créer un temps de chargement.
  const [isLoading, setIsLoading] = useState(true);

  //-------------------------// Filters Brand //--------------------------------------//
  const [Brand, setBrand] = useState("");

  //-------------------------// Filters Model //--------------------------------------//
  const [brandModel, setBrandModel] = useState("");

  //-------------------------// Filters Sort //--------------------------------------//
  const [filterSort, setfilterSort] = useState("");

  //----------------------------------// affichage //----------------------------------//

  const [display, setDisplay] = useState(false);

  //----------------------------------// state pour les favoris  //------------------------------------------//

  const [deleteFavoris, setDeleteFavoris] = useState(false);

  // ---------------------------------------------------------------------------------------------------------------------------- //
  // -------------- // fonction permettant d'obtenir l'ensemble des marques [Playstation, Xbox, Nitendo,...] // ------------------//
  // ---------------------------------------------------------------------------------------------------------------------------- //

  const findBrand = (array) => {
    const newTab = [];
    const alreadyUsedPlatformName = [];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].parent_platforms.length; j++) {
        if (
          alreadyUsedPlatformName.indexOf(
            array[i].parent_platforms[j].platform.name
          ) === -1
        ) {
          alreadyUsedPlatformName.push(
            array[i].parent_platforms[j].platform.name
          );
          newTab.push({
            name: array[i].parent_platforms[j].platform.name,
            id: array[i].parent_platforms[j].platform.id,
          });
        }
      }
    }
    return newTab;
  };

  // ---------------------------------------------------------------------------------------------------------------------------- //
  // ------------- // fonction permettant d'obtenir l'ensemble des models d'une console [Playstation 4, Xbox one, ....]// --------//
  // ---------------------------------------------------------------------------------------------------------------------------- //

  const findPlateFormModels = (array) => {
    const newTab = [];
    const alreadyUsedPlatformName = [];
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array[i].platforms.length - 1; j++) {
        if (
          alreadyUsedPlatformName.indexOf(
            array[i].platforms[j].platform.name
          ) === -1
        ) {
          alreadyUsedPlatformName.push(array[i].platforms[j].platform.name);
          newTab.push({
            name: array[i].platforms[j].platform.name,
            id: array[i].platforms[j].platform.id,
          });
        }
      }
    }
    return newTab;
  };

  // ---------------------------------------------------------------------------------------------------------------------------- //
  // ------------------------------------------- // REQUETE pour les favoris  // ------------------------------------------------ //
  // ---------------------------------------------------------------------------------------------------------------------------- //

  const [FavorisGame, setFavorisGame] = useState({
    // token: token,
    idMovie: "",
    nameGame: "",
    image: "",
    rating: "",
    released: "",
  });

  // ---------------------------------------------------------------------------------------------------------------------------- //
  // ------------------------------------------- // REQUETE POUR LES Favoris // ------------------------------------------------- //
  // ---------------------------------------------------------------------------------------------------------------------------- //

  const favorisData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/favoris",
        FavorisGame,
        {
          headers: {
            Authorization: "Bearer " + token,
            // "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  // ---------------------------------------------------------------------------------------------------------------------------- //
  // ------------------------------------------- // REQUETE POUR LES FILTRES // ------------------------------------------------- //
  // ---------------------------------------------------------------------------------------------------------------------------- //

  const fetchData = async () => {
    let linkBrand = "";
    let linkBrandModel = "";
    let linkSort = "";
    if (filterSort !== null) {
      linkSort = linkSort + `&ordering=${filterSort}`;
    }
    if (Brand !== "") {
      linkBrand = linkBrand + `&parent_platforms=${Brand}`;
    }
    if (brandModel !== "") {
      linkBrandModel = linkBrandModel = `&platforms=${brandModel}`;
    }
    //adresse du serveur (ne pas oublier de fournir une APIkey dans la requete du serveur)
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=97c25f6e4d7742a59e2c63db6c778130&page=${page}&search=${searchagame}${linkBrand}${linkBrandModel}${linkSort}`
    );
    setData(response.data);
    console.log(response.data);
  };

  // ---------------------------------------------------------------------------------------------------------------------------- //
  // -------------------------------------- // REQUETE AU PREMIER RENDER DE LA PAGE // ------------------------------------------ //
  // ---------------------------------------------------------------------------------------------------------------------------- //

  useEffect(() => {
    const firstFetching = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=97c25f6e4d7742a59e2c63db6c778130`
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    firstFetching();
  }, []);
  return isLoading ? (
    <div className="home-app">
      <h1>En cours de chargement</h1>
    </div>
  ) : (
    <div className="home-app">
      {/*----------------------------------------------------------------------------- */}
      {/*--------------------------------- display affichage ------------------------- */}
      {/*----------------------------------------------------------------------------- */}
      <div className="display-affichage">
        display options :
        <div
          onClick={() => {
            setDisplay(true);
          }}
        >
          <Displaycolumn />
        </div>
        <div
          onClick={() => {
            setDisplay(false);
          }}
        >
          <Displaywrap />
        </div>
      </div>
      <div className="search-app">
        <img src={rawglogo} alt="logo-rawg" />
        <form action="">
          <input
            type="text"
            placeholder="Search for a game..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <div
            onClick={() => {
              setSearchaGame(search);
              fetchData();
            }}
            className="loupe"
          >
            {loupe}
          </div>
        </form>
        {search !== "" ? (
          <div className="result-search">
            <p
              style={{
                color: "white",
                margin: "auto",
                textAlign: "center",
              }}
            >
              Search result for <span>"{search}"</span> <br /> Search{" "}
              {data.count} games
            </p>
          </div>
        ) : (
          <div className="result-search">
            <p>Search {data.count} games</p>
          </div>
        )}
      </div>

      {/*----------------------------------------------------------------------------- */}
      {/*--------------------------------- filter ------------------------------------ */}
      {/*----------------------------------------------------------------------------- */}
      {searchagame !== "" ? (
        <div className="filter-bloc1">
          {/*--------------------------------- marque ------------------------------------ */}

          <label className="bloc-filter">
            <p style={{ marginLeft: 30 }}>Brand :</p>
            <select
              className="filter"
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            >
              <option value={null}></option>
              {findBrand(data.results)
                .sort()
                .map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </label>
          {/*--------------------------------- model ------------------------------------ */}

          <label className="bloc-filter">
            <p>Model :</p>
            <select
              className="filter"
              onChange={(event) => {
                setBrandModel(event.target.value);
              }}
            >
              <option value={null}></option>
              {/* {findPlateFormModels(data.results)} */}

              {findPlateFormModels(data.results)
                .sort()
                .map((item, index) => {
                  // map pour intégrer la valeur de nos consoles dans le menu déroulant
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </label>
          {/*--------------------------------- Sort by ------------------------------------ */}

          <label className="bloc-filter">
            <p>Sort By :</p>
            <select
              className="filter"
              onChange={(event) => {
                setfilterSort(event.target.value);
              }}
            >
              <option value={""}></option>
              <option value={"name"}>Name</option>
              <option value={"rating"}>Rate</option>
              <option value={"release"}>Release</option>
            </select>
          </label>

          {/*--------------------------------- bouton filter ------------------------------------ */}

          <div
            className="bouton-Go"
            onClick={() => {
              fetchData();
            }}
          >
            Go Filters !
          </div>
        </div>
      ) : (
        <div className="title-carroussel">
          <h1>Most Revelance Games</h1>
        </div>
      )}
      {/*------------------------------------ Games ----------------------------------------------- */}

      {display === false ? (
        <div className="games">
          {data.results.map((item, index) => {
            return (
              <div key={index} className="all-games">
                <div className="enfant1">
                  <img src={item.background_image} alt="jeux" />
                </div>
                <div className="enfant2">
                  {token ? (
                    <>
                      <div className="title-games">{item.name}</div>

                      <div
                        className="fav"
                        onClick={() => {
                          setFavorisGame({
                            idMovie: item.id,
                            nameGame: item.name,
                            image: item.background_image,
                            rating: item.rating,
                            released: item.released,
                          });
                          console.log(FavorisGame);
                          favorisData();
                        }}
                      >
                        Ajouter au favoris
                      </div>

                      <Link
                        to={`/game/${item.id}`}
                        style={{ textDecoration: "none", color: "#ff4655" }}
                      >
                        <div className="more-infos">Voir+</div>
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="title-games">{item.name}</div>
                      <div
                        className="fav"
                        onClick={() => {
                          alert(
                            "vous devez être connecté pour créer une liste de favoris"
                          );
                        }}
                      >
                        Ajouter au favoris
                      </div>
                      <Link
                        to={`/game/${item.id}`}
                        style={{ textDecoration: "none", color: "#ff4655" }}
                      >
                        <div className="more-infos">Voir+</div>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="games-column">
          {data.results.map((item, index) => {
            return (
              <div key={index} className="all-games-column">
                {token && (
                  <div
                    className="heart-fav"
                    onClick={() => {
                      setFavorisGame({
                        idMovie: item.id,
                        nameGame: item.name,
                        image: item.background_image,
                        rating: item.rating,
                        released: item.released,
                      });
                      console.log(FavorisGame);
                      favorisData();
                    }}
                  >
                    {" "}
                    Ajouter au favoris
                  </div>
                )}

                <Link
                  to={`/game/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="all-games-column">
                    <img src={item.background_image} alt="jeux" />
                    <div className="title-games-column">{item.name}</div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
      {/*-------------------------------- Pagination --------------------------------- */}
      {page === 1 ? (
        <div className="pagination">
          <div
            className="suivante"
            onClick={() => {
              setPage(page + 1);
              fetchData();
            }}
          >
            {chevronsRigth}
          </div>{" "}
        </div>
      ) : (
        <div className="pagination">
          <div
            className="precedente"
            onClick={() => {
              setPage(page - 1);
              fetchData();
            }}
          >
            {chevronsLeft}
          </div>
          <div className="page">{page}</div>
          <div
            className="suivante"
            onClick={() => {
              setPage(page + 1);
              fetchData();
            }}
          >
            {chevronsRigth}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
