import useFetch from "../hooks/useFetch";
import styles from "../modules/main-container.module.css";
import TableRow from "../components/TableRow";

const IngredientPage = () => {
  const { data, reFetch } = useFetch(
    "https://692c9a77c829d4640070075f.mockapi.io/coffeeShop/ingredients"
  );
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const ingredientName = formData.get("ingredientName");
    const description = formData.get("description");
    const ingredientPrice = formData.get("ingredientPrice");

    const inStock = formData.get("inStock") !== "on";
    const lastObj = {
      name: ingredientName,
      price: Number(ingredientPrice).toFixed(2),
      description,
      isInStock: inStock,
    };
    fetch(
      "https://692c9a77c829d4640070075f.mockapi.io/coffeeShop/ingredients",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lastObj),
      }
    )
      .then((res) => res.json())
      .then(() => reFetch());
    e.target.reset();
  };
  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.coffeeForm} action="">
        <input
          className={styles.coffeeSameStyle}
          name="ingredientName"
          type="text"
          placeholder="Ingredient Name"
          required
        />

        <input
          className={styles.coffeeSameStyle}
          name="ingredientPrice"
          type="number"
          min="0"
          step="0.01"
          placeholder="Ingredient Price"
          required
        />
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
                endpoint={"ingredients"}
                action={reFetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngredientPage;
