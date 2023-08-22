import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared";

export default function Customers() {
  const [customers, setCustomers] = useState();
  useEffect(() => {
    const url = baseUrl + "api/customers/";
    fetch(url)
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
                <Link to={"/customer/" + customer.id}>{customer.name}</Link>
              </p>
            );
          })
        : null}
    </p>
  );
}
