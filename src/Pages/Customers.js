import { useEffect, useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState();
  useEffect(() => {
    console.log("fetching...");
    fetch("http://localhost:8000/api/customers/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCustomers(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return <h1>ur papa</h1>;
}
