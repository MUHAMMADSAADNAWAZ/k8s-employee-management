import { useEffect, useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import api from "./api";
import {
  FaDatabase,
  FaLayerGroup,
  FaServer,
  FaUsers,
} from "react-icons/fa";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [notification, setNotification] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = window.setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [notification]);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/employees");
      console.log("Employees from API:", response.data);
      setEmployees(response.data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      showNotification("Failed to load employees.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const checkHealth = async () => {
    try {
      const response = await api.get("/health");
      if (response.data.status === "Healthy") {
        setBackendStatus("Healthy");
      } else {
        setBackendStatus("Unhealthy");
        }
    } catch (err) {
      setBackendStatus("Unhealthy");
    }
  };

  useEffect(() => {
    fetchEmployees();
    checkHealth();
  }, []);

  const handleSaveEmployee = async (employeeData) => {
    try {
      if (editingEmployee) {
        const response = await api.put(`/employees/${editingEmployee.id}`, employeeData);
        setEmployees(employees.map(emp => emp.id === editingEmployee.id ? response.data : emp));
        setEditingEmployee(null);
        showNotification("Employee updated successfully.", "success");
      } else {
        const response = await api.post("/employees", employeeData);
        setEmployees([...employees, response.data]);
        showNotification("Employee added successfully.", "success");
      }
    } catch (error) {
      console.error("Failed to save employee:", error);
      showNotification("Failed to save employee.", "error");
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await api.delete(`/employees/${employeeId}`);
      setEmployees(employees.filter(emp => emp.id !== employeeId));
      if (editingEmployee?.id === employeeId) {
        setEditingEmployee(null);
      }
      showNotification("Employee deleted successfully.", "success");
    } catch (error) {
      console.error("Failed to delete employee:", error);
      showNotification("Failed to delete employee.", "error");
    }
  };

  const statCards = [
    {
      title: "Employees",
      value: employees.length,
      subtitle: "Live from API",
      icon: FaUsers,
      iconClassName: "bg-blue-100 text-blue-600",
    },
    {
      title: "Backend",
      value: backendStatus,
      subtitle: "Health check result",
      icon: FaServer,
      iconClassName: backendStatus === "Healthy" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600",
    },
    {
      title: "Database",
      value: backendStatus === "Healthy" ? "Connected" : "Disconnected",
      subtitle: "Status inferred",
      icon: FaDatabase,
      iconClassName: backendStatus === "Healthy" ? "bg-violet-100 text-violet-600" : "bg-rose-100 text-rose-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {notification && (
        <div
          className={`fixed right-4 top-4 z-50 rounded-xl px-5 py-3 text-sm font-medium text-white shadow-lg ${
            notification.type === "success"
              ? "bg-emerald-500"
              : "bg-rose-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 rounded-[2rem] bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 px-8 py-10 text-white shadow-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
            <FaLayerGroup className="text-cyan-300" />
            Employee Management System
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Employee Management Dashboard
          </h1>
          <p className="text-lg text-slate-200 md:text-xl">
            React • Node.js • PostgreSQL • Kubernetes
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {statCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-2xl bg-white p-6 shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div
                    className={`rounded-2xl p-4 ${card.iconClassName}`}
                  >
                    <Icon className="text-2xl" />
                  </div>
                  <span className="text-right text-3xl font-bold text-slate-800">
                    {card.value}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-slate-800">
                  {card.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {card.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        <EmployeeForm
          editingEmployee={editingEmployee}
          setEditingEmployee={setEditingEmployee}
          onSaveEmployee={handleSaveEmployee}
        />

        <EmployeeTable
          employees={employees}
          onDeleteEmployee={handleDeleteEmployee}
          onEditEmployee={setEditingEmployee}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
