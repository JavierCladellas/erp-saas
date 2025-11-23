import './styles/HamburgerMenu.css'

const Sidebar = ({ isOpen, toggleSidebar, menuItems, currentPage, onSelect }) => {

    return (
        <div className={`bg-white shadow-lg flex flex-col transition-all duration-300 ${isOpen ? "w-60" : "w-20"}`}>
            <div className="relative flex items-center h-16 px-4 border-b">
                <span className={`hamburger-icon ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}>
                    <i></i>
                    <i></i>
                    <i></i>
                </span>
            </div>

            <nav className="flex-1 py-4 flex flex-col gap-1">
                {menuItems?.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => onSelect(item.key)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-gray-700  hover:bg-indigo-100 hover:text-indigo-600 transition  ${isOpen ? "" : "justify-center"}  ${currentPage === item.key ? "bg-indigo-100 text-indigo-600 font-semibold" : ""}`}
                    >
                        <span className="text-xl flex-shrink-0 flex items-center justify-center h-6">{item.icon}</span>
                        {isOpen ? (
                            <span className="text-xl truncate">{item.label}</span>
                        ) : (
                            <span className="hidden">{item.label}</span>
                        )}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;