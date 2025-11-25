import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import DashboardHeader from "../components/dashboardHeader";
import { FaBox, FaUsers, FaClipboardList, FaChartLine, FaWarehouse } from "react-icons/fa";
import Inventory from "./inventory/inventoryPage";
import Users from "./users/UsersPage";
import Products from "./products/productsPage";
import Orders from "./orders/ordersPage";

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState("dashboard");

    const menuItems = [
        { label: "Dashboard", icon: <FaChartLine />, key: "dashboard" },
        { label: "Inventory", icon: <FaWarehouse />, key: "inventory" },
        { label: "Products", icon: <FaBox />, key: "products" },
        { label: "Orders", icon: <FaClipboardList />, key: "orders" },
        { label: "Users", icon: <FaUsers />, key: "users" },
    ];

    const renderPage = () => {
        switch (currentPage) {
            case "inventory": return <Inventory />;
            case "products": return <Products />;
            case "users": return <Users />;
            case "orders": return <Orders />;
            default: return <Products />;
        }
    };


    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar menuItems={menuItems}
                    isOpen={sidebarOpen}
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    currentPage={currentPage}
                    onSelect={setCurrentPage} />

            <div className="flex flex-col flex-1 overflow-hidden">
                <DashboardHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                <main className="flex-1 overflow-auto p-6">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;