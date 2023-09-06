import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../Components/AddCustomer";
import { LoginContext } from "../App";

export default function Customers() {
	const [loggedIn, setLoggedIn] = useContext(LoginContext);
	const [customers, setCustomers] = useState();

	const [show, setShow] = useState(false);

	function toggleShow() {
		setShow(!show);
	}

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const url = baseUrl + "api/customers/";
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("access"),
			},
		})
			.then((response) => {
				if (response.status === 401) {
					setLoggedIn(false);
					navigate("/login", {
						state: {
							previousUrl: location.pathname,
						},
					});
				}
				return response.json();
			})

			.then((data) => {
				console.log(data);
				setCustomers(data.customers);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, [navigate]);

	function newCustomer(name, industry) {
		const data = { name: name, industry: industry };
		const url = baseUrl + "api/customers/";
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
			.then((data) => {
				toggleShow();
				setCustomers([...customers, data.customer]);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	return (
		<>
			<h1>Here are our customers:</h1>
			{customers
				? customers.map((customer) => {
						return (
							<div
								className="m-2"
								key={customer.id}
							>
								<Link to={"/customer/" + customer.id}>
									<button className="hover:no-underline bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded">
										{customer.name}
									</button>
								</Link>
							</div>
						);
				  })
				: null}
			<AddCustomer
				newCustomer={newCustomer}
				show={show}
				toggleShow={toggleShow}
			/>
		</>
	);
}
