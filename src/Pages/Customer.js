import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "../Components/NotFound";
import { baseUrl } from "../shared";

export default function Customer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState();
  const [notFound, setNotFound] = useState();
  useEffect(() => {
    const url = baseUrl + "api/customers/" + id;
    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          //redirect to another page(404 page)  navigate("/404");
          //render a 404 component
          setNotFound(true);
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
      });
  }, []);
  return (
    <>
      {notFound ? <NotFound /> : null}
      {customer ? (
        <div>
          <input type="text" value={customer.id} />
          <input type="text" value={customer.name} />
          <input type="text" value={customer.industry} />
        </div>
      ) : null}
      <button
        onClick={(e) => {
          const url = baseUrl + "api/customers/" + id;
          fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Something went wrong");
              }

              navigate("/customers");
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        Delete
      </button>
      <br />
      <Link to="/customers">Go Back</Link>
    </>
  );
}
