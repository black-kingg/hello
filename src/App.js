import "./index.css";
import Employee from "./Components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddEmployee from "./Components/AddEmployee";
import EditEmployee from "./Components/EditEmployee";
import Header from "./Components/Header";
import Employees from "./Pages/Employees";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./Pages/Customers";

function App() {
  return (
    <Header>
      <BrowserRouter>
        <Routes>
          <Route path="/Employees" element={<Employees />} />
          <Route path="/Customers" element={<Customers />} />
        </Routes>
      </BrowserRouter>
    </Header>
  );
}

export default App;
