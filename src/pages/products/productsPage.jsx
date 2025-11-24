import { FaBoxes, FaLayerGroup, FaEye, FaStar } from "react-icons/fa";
import PageHeader from "../../components/pageHeader";
import SummaryCard from "../../components/summaryCard";
import { SkeletonTable, SkeletonCard } from "../../components/loading/skeleton";
import useFetch from "../../components/useFetch";
import SimpleProductsTable from "./simpleProductsTable";
import VariableProductsTable from "./variableProductsTable";
import ProductCreateForm from "./createForm";
import { useState } from "react";

const Products = () => {
    const { data: products, loading, error } = useFetch("http://localhost:8000/api/products");
    const [showModal, setShowModal] = useState(false);

    const simpleProducts = products.filter((p) => !p.is_variable);
    const variableProducts = products.filter((p) => p.is_variable);

    const summaryData = [
        { icon: <FaBoxes />, label: "Total Products", value: products.length, color: "text-indigo-600" },
        { icon: <FaLayerGroup />, label: "Variable Products", value: variableProducts.length, color: "text-green-500" },
        { icon: <FaEye />, label: "Visible Products", value: products.filter(p => p.visibility).length, color: "text-blue-500" },
        { icon: <FaStar />, label: "Featured Products", value: products.filter(p => p.featured).length, color: "text-yellow-500" },
    ];

    if (loading) {
        return (
            <div className="space-y-6">
                <PageHeader title="Products" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {summaryData.map((_, idx) => <SkeletonCard key={idx} />)}
                </div>
                <h2 className="text-xl font-bold text-gray-800">Simple Products</h2>
                <SkeletonTable />
                <h2 className="text-xl font-bold text-gray-800">Variable Products</h2>
                <SkeletonTable />
            </div>
        );
    }

    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <>
            <div className="space-y-6">
                <PageHeader title="Products" actionLabel="Add Product" onAction={() => setShowModal(true)} />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {summaryData.map((card, idx) => <SummaryCard key={idx} {...card} />)}
                </div>

                <h2 className="text-xl font-bold text-gray-800">Simple Products</h2>
                <SimpleProductsTable simpleProducts={simpleProducts} />
                <h2 className="text-xl font-bold text-gray-800">Variable Products</h2>
                <VariableProductsTable variableProducts={variableProducts} />
            </div>
            <ProductCreateForm showModal={showModal} onClose={() => setShowModal(false)} />
        </>
    );
};

export default Products;
