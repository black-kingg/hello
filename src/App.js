import "./index.css";
import { createContext, useEffect, useState } from "react";
import Header from "./Components/Header";
import Employees from "./Pages/Employees";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./Pages/Customers";
import Customer from "./Pages/Customer";
import Dictionary from "./Pages/Dictionary";
import Definition from "./Pages/Definition";
import NotFound from "./Components/NotFound";
import Login from "./Pages/Login";
import { baseUrl } from "./shared";
import Register from "./Pages/Register";

export const LoginContext = createContext();

function App() {
	useEffect(() => {
		function refreshTokens() {
			if (localStorage.refresh) {
				const url = baseUrl + "api/token/refresh/";
				fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ refresh: localStorage.refresh }),
				})
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						localStorage.access = data.access;
						localStorage.refresh = data.refresh;
						setLoggedIn(true);
					});
			}
		}
		const minutes = 1000 * 60;
		refreshTokens();
		setInterval(refreshTokens, minutes * 3);
	}, []);
	const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);
	function changeLoggedIn(value) {
		setLoggedIn(value);
		if (value === false) {
			localStorage.clear();
		}
	}

	return (
		<LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
			<BrowserRouter>
				<Header>
					<Routes>
						<Route
							path="/"
							element={<Employees />}
						/>
						<Route
							path="/employees"
							element={<Employees />}
						/>

						<Route
							path="/customers"
							element={<Customers />}
						/>
						<Route
							path="/customer/:id"
							element={<Customer />}
						/>

						<Route
							path="/dictionary"
							element={<Dictionary />}
						/>
						<Route
							path="/dictionary/:search"
							element={<Definition />}
						/>

						<Route
							path="/login"
							element={<Login />}
						/>
						<Route
							path="/register"
							element={<Register />}
						/>

						<Route
							path="/404"
							element={<NotFound />}
						/>
						<Route
							path="#"
							element={<NotFound />}
						/>
					</Routes>
				</Header>
			</BrowserRouter>
		</LoginContext.Provider>
	);
}

export default App;
