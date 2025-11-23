import { FaBell, FaUserCircle } from "react-icons/fa";

const DashboardHeader = ({ toggleSidebar }) => {
    return (
        <header className="flex justify-between items-center h-16 px-6 bg-white shadow w-full flex-shrink-0">
            <div className="flex items-center gap-8 justify-center">
                <h1 className="text-2xl font-bold text-indigo-600 truncate">MyERP</h1>
            </div>

            <div className="flex items-center gap-4">
                <FaBell className="text-gray-600 text-xl hover:text-indigo-600 cursor-pointer" />
                <FaUserCircle className="text-gray-600 text-2xl hover:text-indigo-600 cursor-pointer" />
            </div>
        </header>
    );
};

export default DashboardHeader;
