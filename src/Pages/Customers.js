import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Customers() {
  const [customers, setCustomers] = useState();
  const [notFound, setNotFound] = useState();
  useEffect(() => {
    console.log("fetching...");
    fetch("http://localhost:8000/api/customers/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCustomers(data.customers);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <p>
      <h1>Here are our customers:</h1>
      {customers
        ? customers.map((customer) => {
            return (
              <p>
                <Link to={"/customer" + customer.id}>{customer.name}</Link>
              </p>
            );
          })
        : null}
    </p>
  );
}
