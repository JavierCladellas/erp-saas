import { FaBoxes, FaExclamationTriangle, FaLayerGroup, FaClock } from "react-icons/fa";
import PageHeader from "../../components/pageHeader";
import SummaryCard from "../../components/summaryCard";
import { SkeletonTable, SkeletonCard } from "../../components/loading/skeleton";
import { useState } from "react";
import ItemCreateForm from "./createForm";
import useFetch from "../../components/useFetch";
import InventoryTable from "./table";


const Inventory = () => {
    const { data: inventory, loading, error } = useFetch("http://localhost:8000/api/items");
    const [showModal, setShowModal] = useState(false);

    const summaryData = [
        { icon: <FaBoxes />, label: "Total Items", value: inventory.length, color: "text-indigo-600" },
        { icon: <FaLayerGroup />, label: "Total Stock", value: inventory.reduce((sum, item) => sum + item.stock, 0), color: "text-green-500" },
        { icon: <FaExclamationTriangle />, label: "Low Stock Items (<5)", value: inventory.filter(item => item.stock < 5).length, color: "text-red-500" },
        {
            icon: <FaClock />,
            label: "Last Added",
            value: inventory.length > 0 ? inventory[inventory.length - 1].name : "—",
            color: "text-yellow-500"
        },
    ];


    if (loading) {
        return (
            <div className="space-y-6">
                <PageHeader title="Inventory" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {summaryData.map((card, idx) => (<SkeletonCard key={idx} {...card} />))}
                </div>
                <SkeletonTable />
            </div>
        );
    }

    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <>

            <div className="space-y-6">
                <PageHeader title="Inventory" actionLabel="Add Item" onAction={() => setShowModal(true)} />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {summaryData.map((card, idx) => (<SummaryCard key={idx} {...card} />))}
                </div>

                <InventoryTable data={inventory} />
            </div>
            <ItemCreateForm showModal={showModal} onClose={() => setShowModal(false)} />
        </>
    );
};

export default Inventory;
