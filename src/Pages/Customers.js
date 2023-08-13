import { useEffect, useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState();
  useEffect(() => {
    console.log("fetching...");
    fetch("http://localhost:8000/api/customers/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCustomers(data);
      });
  });
  return (
    <div className="App bg-gray-300 min-h-screen">
      <h1>ur papa</h1>
    </div>
  );
}
