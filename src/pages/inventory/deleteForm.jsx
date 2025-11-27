import DeleteModal from "../../components/deleteModal";

const ItemDeleteForm = ({ showModal, onClose, item }) => {

    const handleDelete = () => {
        alert("Deleted Item!");
        onClose();
    };

    const message = (
        <div className="py-4 space-y-3 text-gray-900 text-[17px] leading-snug">

            <p>
                Are you sure you want to delete <strong>{item?.name}</strong>?
            </p>

            <p className="text-red-700 font-semibold">
                This action cannot be undone.
            </p>

            <p className="text-gray-600 text-[15px]">
                Deleting this inventory item is only possible if no products or variants still reference it.
            </p>

            <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                <li>The item must not be linked to any product</li>
                <li>The item must not be linked to any product variant</li>
            </ul>

        </div>
    );


return (
    <DeleteModal
        open={showModal}
        onClose={onClose}
        title={`Delete ${item?.sku} - ${item?.name} ?`}
        message={message}
        confirmLabel="Delete Item"
        onConfirm={handleDelete}
    />
);

};


export default ItemDeleteForm;