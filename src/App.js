import "./index.css";
import { createContext, useState } from "react";
import Header from "./Components/Header";
import Employees from "./Pages/Employees";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./Pages/Customers";
import Customer from "./Pages/Customer";
import Dictionary from "./Pages/Dictionary";
import Definition from "./Pages/Definition";
import NotFound from "./Components/NotFound";
import Login from "./Pages/Login";

export const LoginContext = createContext();

function App() {
	const [loggedIn, setLoggedIn] = useState(true);
	return (
		<LoginContext.Provider value={[loggedIn, setLoggedIn]}>
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
