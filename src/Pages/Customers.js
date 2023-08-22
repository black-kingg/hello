import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../Components/AddCustomer";

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

  function newCustomer(name, industry) {
    const data = { name: name, industry: industry };
    const url = baseUrl + "api/customers";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {})
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <h1>Here are our customers:</h1>
      <ul>
        {customers
          ? customers.map((customer) => {
              return (
                <li key={customer.id}>
                  <Link to={"/customer/" + customer.id}>{customer.name}</Link>
                </li>
              );
            })
          : null}
      </ul>
      <AddCustomer newCustomer={newCustomer} />
    </>
  );
}
