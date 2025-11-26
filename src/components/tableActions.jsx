import { FaEdit, FaTrash } from "react-icons/fa";


const TableActions = ({ onEdit, onDelete }) => (
    <div className="flex justify-end gap-2" onClick={(e)=>(e.stopPropagation())}>
        <button
            onClick={onEdit}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition"
            title="Edit"
        >
            <FaEdit />
        </button>
        <button
            onClick={onDelete}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-800 transition"
            title="Delete"
        >
            <FaTrash />
        </button>
    </div>
);

export default TableActions;