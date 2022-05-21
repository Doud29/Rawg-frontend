//------------------------- import de nos packages -------------------------//
import { useEffect, useState } from "react";
import axios from "axios";

//----------------------------- Composent home -----------------------------//

const Home = () => {
  //DATA : récupére l'objet de l'api.
  const [data, setData] = useState({});
  //iSloading : nous permettra de savoir si la requête a bien fonctionné. cela nous permettra de créer un temps de chargement.
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        //adresse du serveur (ne pas oublier de fournir une APIkey dans la requete du serveur)
        const response = await axios.get("");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
  }, []);
  return isLoading ? <h1>En cours de chargement</h1> : <div>page home</div>;
};

export default Home;
