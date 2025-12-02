import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((newdata) => setData(newdata));
  }, []);
  const reFetch = () => {
    fetch(url)
      .then((res) => res.json())
      .then((newdata) => setData(newdata));
  };

  return { data, reFetch };
};

export default useFetch;
