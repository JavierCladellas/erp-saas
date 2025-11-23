import PageHeader from "../../components/pageHeader";
import SummaryCard from "../../components/summaryCard";
import Table from "../../components/table";
import TableActions from "../../components/tableActions";
import { SkeletonTable, SkeletonCard } from "../../components/loading/skeleton";
import useFetch from "../../components/useFetch";


const Orders = () =>{
    const { data: orders, loading, error } = useFetch("http://localhost:8000/api/orders");


    const summaryData = [
    ];

    const columns = [
        { key:"email", label:"Email", width:"w-40" },
        { key:"role", label:"Role", width:"w-20" },
        {
            key: "actions", label: "", width: "w-10", align: "right",
            render: (_, row) => (
                <TableActions
                    onEdit={() => alert(`Edit ${row.name}`)}
                    onDelete={() => alert(`Delete ${row.name}`)}
                />
            ),
        },
    ];



    if (loading) {
        return (
            <div className="space-y-6">
                <PageHeader title="Orders" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {summaryData.map((card, idx) => (<SkeletonCard key={idx} {...card} />))}
                </div>
                <SkeletonTable />
            </div>
        );
    }

    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Orders"
                actionLabel="Add User"
                onAction={() => alert("Add User clicked")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {summaryData.map((card, idx) => (
                    <SummaryCard key={idx} {...card} />
                ))}
            </div>

            <Table columns={columns} data={orders} />
        </div>
    );
};

export default Orders;