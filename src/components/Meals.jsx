import axios from "axios";
import { useEffect, useState } from "react";
import Mealitem from "./Mealitem";

function Meals() {
  const [mealsList, setMealsList] = useState([]);

  const fetchMeals = async () => {
    try {
      const meals = await axios.get("http://localhost:3000/meals");
      setMealsList(meals.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {mealsList.map((meal) => {
        return <Mealitem meal={meal} />;
      })}
    </ul>
  );
}

export default Meals;