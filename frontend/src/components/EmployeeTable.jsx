import { useState } from "react";
import EmployeeRow from "./EmployeeRow";
import { FaSearch, FaInbox, FaSpinner } from "react-icons/fa";

export default function EmployeeTable({
  employees,
  onDeleteEmployee,
  onEditEmployee,
  isLoading,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredEmployees = employees.filter(
    (employee) =>
      (employee.first_name &&
        employee.first_name
          .toLowerCase()
          .includes(normalizedSearchTerm)) ||
      (employee.last_name &&
        employee.last_name.toLowerCase().includes(normalizedSearchTerm)) ||
      (employee.email &&
        employee.email.toLowerCase().includes(normalizedSearchTerm)) ||
      (employee.department &&
        employee.department.toLowerCase().includes(normalizedSearchTerm))
  );

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-8 text-center">
        <div className="inline-flex items-center gap-3 text-slate-600">
          <FaSpinner className="animate-spin text-2xl" />
          <span className="text-lg font-medium">Loading employees...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Employees</h2>
      </div>

      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FaSearch className="text-slate-400" />
        </div>
        <input
          type="text"
          className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredEmployees.length === 0 ? (
        <div className="text-center py-16">
          <FaInbox className="text-6xl text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No employees found</h3>
          <p className="text-slate-500">Click "Add Employee" to create your first employee!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-4 px-4 font-semibold text-slate-700">First Name</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Last Name</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Department</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Email</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <EmployeeRow
                  key={employee.id}
                  employee={employee}
                  index={index}
                  onEdit={() => onEditEmployee(employee)}
                  onDelete={() => onDeleteEmployee(employee.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
