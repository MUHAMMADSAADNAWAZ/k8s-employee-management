import { useState, useEffect } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";

export default function EmployeeForm({
    editingEmployee,
    setEditingEmployee,
    onSaveEmployee,
}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");

    useEffect(() => {
        if (editingEmployee) {
            setFirstName(editingEmployee.first_name || "");
            setLastName(editingEmployee.last_name || "");
            setEmail(editingEmployee.email || "");
            setDepartment(editingEmployee.department || "");
        } else {
            resetForm();
        }
    }, [editingEmployee]);

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setDepartment("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSaveEmployee({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            department,
        });
        resetForm();
    };

    return (
        <div className="bg-white shadow-xl rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                {editingEmployee ? <FaEdit className="text-yellow-500" /> : <FaPlus className="text-blue-600" />}
                {editingEmployee ? "Edit Employee" : "Add Employee"}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="John"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="Doe"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                        <select
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                        >
                            <option value="">Select Department</option>
                            <option value="DevOps">DevOps</option>
                            <option value="Backend">Backend</option>
                            <option value="QA">QA</option>
                            <option value="HR">HR</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-semibold"
                    >
                        {editingEmployee ? <FaEdit /> : <FaPlus />}
                        {editingEmployee ? "Update Employee" : "Add Employee"}
                    </button>
                    {editingEmployee && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingEmployee(null);
                                resetForm();
                            }}
                            className="flex items-center gap-2 px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-all font-semibold"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
