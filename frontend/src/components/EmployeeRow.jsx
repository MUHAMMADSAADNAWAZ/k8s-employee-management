import { FaEdit, FaTrash } from "react-icons/fa";

const getDepartmentBadge = (department) => {
    const badges = {
        "DevOps": "bg-blue-100 text-blue-800",
        "Backend": "bg-green-100 text-green-800",
        "QA": "bg-yellow-100 text-yellow-800",
        "HR": "bg-purple-100 text-purple-800"
    };
    return badges[department] || "bg-gray-100 text-gray-800";
};

export default function EmployeeRow({ employee, index, onEdit, onDelete }) {
    return (
        <tr className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}>
            <td className="py-4 px-4 text-gray-800 font-medium">{employee.first_name || "-"}</td>
            <td className="py-4 px-4 text-gray-800 font-medium">{employee.last_name || "-"}</td>
            <td className="py-4 px-4">
                {employee.department && (
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDepartmentBadge(employee.department)}`}>
                        {employee.department}
                    </span>
                )}
                {!employee.department && (
                    <span className="text-gray-400">-</span>
                )}
            </td>
            <td className="py-4 px-4 text-gray-600">{employee.email || "-"}</td>
            <td className="py-4 px-4">
                <div className="flex flex-wrap gap-3">
                <button
                    onClick={onEdit}
                    className="flex items-center gap-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors font-medium"
                >
                    <FaEdit />
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="flex items-center gap-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                >
                    <FaTrash />
                    Delete
                </button>
                </div>
            </td>
        </tr>
    );
}
