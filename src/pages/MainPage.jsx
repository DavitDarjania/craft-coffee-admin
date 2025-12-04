import { useEffect, useState } from "react";
import styles from "../modules/main-container.module.css";
import SelectOption from "../components/SelectOption";
import useFetch from "../hooks/useFetch";
import TableRow from "../components/TableRow";

const MainPage = () => {
  const [selectNum, setSelectNum] = useState([{ id: 1 }]);
  const [counter, setCounter] = useState(1);
  const { data, reFetch } = useFetch(
    "https://692c9a77c829d4640070075f.mockapi.io/coffeeShop/coffees"
  );
  const { data: ingData, reFetch: ingReFetch } = useFetch(
    "https://692c9a77c829d4640070075f.mockapi.io/coffeeShop/ingredients"
  );
  const removeSelect = (id) => {
    const filteredList = selectNum.filter((el) => el.id !== id);
    return setSelectNum(filteredList);
  };
  const [ingredientPrices, setIngredientPrices] = useState({});
  useEffect(() => {
    console.log(`ingredient prices ${ingredientPrices}`);
    console.log(`ingredient data ${ingData}`);
    ingData.forEach((el) =>
      setIngredientPrices((prev) => ({ ...prev, [el.name]: el.price }))
    );
  }, [ingData]);

  const [ingredients, setIngredients] = useState({});
  console.log(ingredients);

  const onSubmit = (e) => {
    e.preventDefault();
    let sumPrice = 2;
    for (const ingredient in ingredients) {
      sumPrice += Number(ingredientPrices[ingredients[ingredient]]);
    }
    sumPrice = sumPrice.toFixed(2);
    const formData = new FormData(e.target);
    const coffeeName = formData.get("coffeeName");
    const description = formData.get("description");
    const inStock = formData.get("inStock") !== "on";
    const lastObj = {
      name: coffeeName,
      description,
      price: sumPrice,
      ingredients,
      isInStock: inStock,
    };
    console.log(coffeeName, description, inStock, ingredients, sumPrice);
    fetch("https://692c9a77c829d4640070075f.mockapi.io/coffeeShop/coffees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lastObj),
    })
      .then((res) => res.json())
      .then((res) => {
        setIngredients({});
        setSelectNum([{ id: 1 }]);
        setCounter(1);
        reFetch();
      });
    e.target.reset();
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.coffeeForm} action="">
        <input
          className={styles.coffeeSameStyle}
          name="coffeeName"
          type="text"
          placeholder="Coffee Name"
          required
        />
        <div className={styles.selectBox}>
          {selectNum.map((el) => (
            <SelectOption
              key={el.id}
              id={el.id}
              action={removeSelect}
              saveIngredient={setIngredients}
              ingredients={ingredients}
            />
          ))}
          <button
            type="button"
            onClick={() => {
              setSelectNum((prev) => [...prev, { id: counter + 1 }]);
              setCounter(counter + 1);
            }}
            className={styles.selectButton}
          >
            Add Ingredient
          </button>
        </div>

        <textarea
          name="description"
          className={styles.coffeeSameStyle}
          type="textarea"
          placeholder="Description"
          required
        />
        <div className={styles.stock}>
          <label htmlFor="inStock">Out Of Stock</label>
          <input id="inStock" type="checkbox" name="inStock" />
        </div>
        <button className={styles.selectButton} type="submit">
          Submit
        </button>
      </form>
      <div className={styles.scrollOverflow}>
        <table className={styles.coffeeInfoSection}>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>In Stock</th>
              <th>Action</th>
            </tr>
            {data.map((el) => (
              <TableRow
                key={el.id}
                name={el.name}
                price={el.price}
                id={el.id}
                isInStock={el.isInStock}
                action={reFetch}
                endpoint={"coffees"}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainPage;
