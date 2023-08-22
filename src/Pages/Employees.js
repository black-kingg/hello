import "../index.css";
import Employee from "../Components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddEmployee from "../Components/AddEmployee";
import EditEmployee from "../Components/EditEmployee";
import Header from "../Components/Header";

function Employees() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Sigh",
      role: "Intern",
      img: "https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg",
    },
    {
      id: 2,
      name: "caleb",
      role: "Manager",
      img: "https://images.pexels.com/photos/2743754/pexels-photo-2743754.jpeg",
    },
    {
      id: 3,
      name: "Mubarak",
      role: "Senior developer",
      img: "https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg",
    },
    {
      id: 4,
      name: "Josh",
      role: "developer",
      img: "https://images.pexels.com/photos/2586823/pexels-photo-2586823.jpeg",
    },
    {
      id: 5,
      name: "King",
      role: "Social Media Manager",
      img: "https://images.pexels.com/photos/17358325/pexels-photo-17358325/free-photo-of-portrait-of-man.jpeg",
    },
  ]);

  function updateEmployee(id, newName, newRole) {
    const updatedEmployees = employees.map((employee) => {
      if (id === employee.id) {
        return { ...employee, name: newName, role: newRole, img: employee.img };
      }
      return employees;
    });
    setEmployees(updatedEmployees);
  }

  function newEmployee(name, role, img) {
    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      img: img,
    };
    setEmployees([...employees, newEmployee]);
  }

  const showEmployees = true;
  return (
    <div className="">
      {showEmployees ? (
        <>
          <div className="flex flex-wrap justify-center">
            {employees.map((employee) => {
              const editEmployee = (
                <EditEmployee
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  updateEmployee={updateEmployee}
                />
              );
              return (
                <Employee
                  key={employee.id}
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  img={employee.img}
                  editEmployee={editEmployee}
                />
              );
            })}
          </div>
          <AddEmployee newEmployee={newEmployee} />
        </>
      ) : (
        <p>You cannot see the employees</p>
      )}
    </div>
  );
}

export default Employees;
