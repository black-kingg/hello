import "./index.css";
import Header from "./Components/Header";
import Employees from "./Pages/Employees";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./Pages/Customers";
import Dictionary from "./Pages/Dictionary";
import Definition from "./Pages/Definition";

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/definition" element={<Definition />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
