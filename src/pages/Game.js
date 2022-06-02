//----------------------------- import  scss -----------------------------//
import "./game.scss";

//----------------------------- REACT -----------------------------//
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//----------------------------- import  axios -----------------------------//
import axios from "axios";

//----------------------------- import  icone(s) -------------------------//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const Game = () => {
  const rating = (array) => {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray.push({
        percent: array[i].percent,
        id: array[i].id,
        title: array[i].title,
      });
    }
    return newArray;
  };

  //----------------------------------// Fonction couleur Diagramme //------------------------------------------//

  const getColor = (id) => {
    let color = "";
    // console.log(index);
    // console.log(array, "mon tableau");
    if (id === 5) {
      color = "green";
    } else if (id === 4) {
      color = "purple";
    } else if (id === 3) {
      color = "orange";
    } else if (id === 1) {
      color = "red";
    }
    return color;
  };
  //----------------------------------// icone  //------------------------------------------//

  const comments = <FontAwesomeIcon icon={faMessage} />;
  const bookmark = <FontAwesomeIcon icon={faBookmark} />;
  //----------------------------------// params  //------------------------------------------//

  const { id } = useParams();

  //----------------------------------// state pour le chargement  //------------------------------------------//

  const [data, setData] = useState([]);
  const [dataserie, setDataserie] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [slug, setSlug] = useState("");
  //----------------------------------// requête pour les jeux de la même séries  //------------------------------------------//

  useEffect(() => {
    try {
      const fetchdata = async () => {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=97c25f6e4d7742a59e2c63db6c778130`
        );
        setData(response.data);
        setIsLoading(false);
        setSlug(response.data.slug);
        console.log(response.data);
        console.log(slug);
      };
      if (slug) {
        const fetchseries = async () => {
          const response = await axios.get(
            `https://api.rawg.io/api/games/${slug}/game-series?key=97c25f6e4d7742a59e2c63db6c778130`
          );
          setDataserie(response.data.results);
          console.log(response.data);

          setIsLoading(false);
        };

        fetchseries();
      }

      fetchdata();
    } catch (error) {
      console.log(error.response);
    }
  }, [id, slug]);

  return isloading ? (
    <div>En cours de chargement</div>
  ) : (
    <div className="game-app">
      <div className="game-description">
        <h2>{data.name}</h2>
        <div className="bloc-description">
          <img src={data.background_image} alt="jeux" />
          <div className="about-game">
            <div className="bloc-review">
              <div className="reviews">
                {" "}
                Save to <br /> Collection {bookmark}
              </div>
              <div className="reviews">
                {" "}
                Add a <br /> Review {comments}
              </div>
            </div>
            <div className="bloc-about-the-game">
              <div className="bloc-about">
                <div className="description">
                  {" "}
                  <span className="title">Plateforms</span> <br />
                  {data.parent_platforms.map((item, index) => {
                    return <span key={index}>{item.platform.name} </span>;
                  })}{" "}
                </div>
                <div className="description">
                  <span className="title">Released date</span> <br />
                  <span>{data.released}</span>
                </div>
                <div className="description">
                  <span className="title">Publisher</span> <br />
                  {data.publishers.map((item, index) => {
                    return <span key={index}>{item.name} </span>;
                  })}
                </div>
              </div>
              <div className="bloc-about">
                <div className="description">
                  <span className="title">Genres</span> <br />
                  {data.genres.map((item, index) => {
                    return (
                      <span className="text" key={index}>
                        {item.name}
                      </span>
                    );
                  })}
                </div>
                <div className="description">
                  <span className="title">Developper</span> <br />
                  {data.developers.map((item, index) => {
                    return (
                      <span key={index}>
                        {item.name} <br />
                      </span>
                    );
                  })}
                </div>
                <div className="description">
                  <span className="title">Average Rating</span> <br />
                  <span>{data.rating}</span>
                </div>
              </div>
            </div>
            <div className="description-game">
              <span className="title">About</span> <br />
              <span className="line-champ">{data.description_raw}</span>
            </div>
          </div>
        </div>
        {/* <h2>Rating from gamers</h2> */}
        <div className="rating-game">
          <div className="infos-rating">
            <div className="rating-bloc">
              <span>#{data.updated}</span> <br />
              <span>Last Updated</span>
            </div>
            <div className="rating-bloc">
              <span>#{data.ratings_count}</span> <br />
              <span>Shooter</span>
            </div>
            <div className="rating-bloc">
              <span>{data.rating} / 5</span> <br />
              <span>Rate</span>
            </div>
          </div>
          <div className="pourcentage">
            {rating(data.ratings).map((item, index) => {
              return (
                <div key={index} className="valeur">
                  <div
                    className="pourcentage-bloc"
                    style={{
                      width: item.percent + "%",
                      backgroundColor: getColor(item.id),
                    }}
                  ></div>{" "}
                  <span style={{ fontSize: 12, color: "grey", marginLeft: 10 }}>
                    {" "}
                    {item.percent} % {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>{" "}
      <h2 style={{ marginLeft: 30 }}>Games like {data.name} </h2>
      <div className="game-serie">
        <div className="carroussel">
          {dataserie.map((item, index) => {
            return (
              <div classkey={index} className="bloc-image">
                <img src={item.background_image} alt="similitude" />
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <h2 style={{ marginLeft: 30 }}>Add a reviews </h2>
    </div>
  );
};

export default Game;
