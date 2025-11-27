import DeleteModal from "../../components/deleteModal";

const ProductDeleteForm = ({ showModal, onClose, product }) => {

    const handleDelete = () => {
        alert("Deleted product!");
        onClose();
    };

    const message = (
        <div className="py-4 space-y-3 text-gray-900 text-[17px] leading-snug">

            <p>
                Are you sure you want to delete <strong>{product?.name}</strong>?
            </p>

            <p className="text-red-700 font-semibold">
                This action cannot be undone.
            </p>

            <p className="text-gray-600 text-[15px]">
                Deleting this product is only possible if no variants are still linked to it.
            </p>

            <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                <li>The product must not have any associated variants</li>
                <li>All variants must be deleted or reassigned before deleting the product</li>
            </ul>

        </div>
    );



    return (
        <DeleteModal
            open={showModal}
            onClose={onClose}
            title={`Delete ${product?.sku} - ${product?.name} ?`}
            message={message}
            confirmLabel="Delete Product"
            onConfirm={handleDelete}
        />
    );

};


export default ProductDeleteForm;