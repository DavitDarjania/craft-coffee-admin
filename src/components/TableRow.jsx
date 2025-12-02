import React from "react";
import styles from "../modules/main-container.module.css";
import EditIcon from "../assets/icons/edit.png";
import DeleteIcon from "../assets/icons/delete.png";
import { useNavigate } from "react-router-dom";

const TableRow = ({ name, price, id, isInStock, action, endpoint }) => {
  const onDelete = (id) => {
    fetch(
      `https://692c9a77c829d4640070075f.mockapi.io/coffeeShop/${endpoint}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => action());
  };
  return (
    <tr className={styles.coffeeInfoItem} key={id}>
      <td>{name}</td>
      <td>{price}</td>
      <td>{isInStock ? "in stock" : "out of stock"}</td>
      <td style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => onDelete(id)} className={styles.DeleteIcon}>
          <img src={DeleteIcon} alt="" />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
