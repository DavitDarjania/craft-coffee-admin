import React, { useState } from "react";
import Bin from "../assets/icons/bin.png";
import styles from "../modules/select-options.module.css";
import useFetch from "../hooks/useFetch";

const SelectOption = ({ action, id, saveIngredient, ingredients }) => {
  const { data, reFetch } = useFetch(
    "https://692c9a77c829d4640070075f.mockapi.io/coffeeShop/ingredients"
  );
  return (
    <div className={styles.SelectBox}>
      <select
        name={`ingredient-${id}`}
        className={styles.coffeeSelect}
        onChange={(e) =>
          saveIngredient((prev) => ({ ...prev, [id]: e.target.value }))
        }
      >
        <option value="">-- choose an ingredient --</option>
        {data.map((el) => {
          if (el.isInStock) {
            return (
              <option key={el.id} value={el.name}>
                {el.name}
              </option>
            );
          }
        })}
      </select>
      <button
        onClick={() => {
          const { [id]: _, ...filtered } = ingredients;
          saveIngredient(filtered);
          action(id);
        }}
        className={styles.button}
        type="button"
      >
        <img className={styles.bin} src={Bin} alt="" />
      </button>
    </div>
  );
};

export default SelectOption;
