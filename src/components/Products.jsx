import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function Products({ getLength, addItem }) {
  const [mealsList, setMealsList] = useState([]);

  async function getMeals() {
    const response = await axios.get("http://localhost:3000/meals");
    setMealsList(response.data);
  }

  useEffect(() => {
    getMeals();
  }, []);

  //CHECK HOW DID HE GET IMAGES

  return (
    <div id="meals">
      {mealsList.map((meal, key) => {
        return (
          <article className="meal-item" key={meal.id}>
            <img src={`http://localhost:3000/${meal.image}`} />
            <h3>{meal.name}</h3>
            <div className="meal-item-price">{meal.price}</div>
            <div className="meal-item-description">{meal.description}</div>
            <div className="meal-item-actions">
              <button className="button" onClick={() => addItem(meal)}>
                Add to cart
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default Products;
