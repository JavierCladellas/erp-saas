import ModalForm from "../../components/modalForm";

const ItemView = ({ showModal, onClose, item }) => {


    const itemViewFields = [
        { name: "name", label: "Item Name", type: "text", defaultValue: item?.name, readOnly: true  },
        {
            row: true,
            fields: [
                { name: "sku", label: "SKU", type: "text", flex: 3, placeholder: "SKU12345",defaultValue: item?.sku, readOnly: true  },
                { name: "stock", label: "Stock", type: "number", flex: 1, defaultValue: item?.stock, readOnly: true  }
            ],
        },
        { name: "description", label: "Description", type: "textarea",defaultValue: item?.description, readOnly: true  },
        { name: "image", label: "Image", type: "image", defaultValue:"http://localhost:8000/api/"+item?.image_url, readOnly: true },
    ];



    return (
        <ModalForm
            open={showModal}
            onClose={onClose}
            title={`${item?.sku} - ${item?.name}`}
            fields={itemViewFields}
            submitLabel={null}
            closeLabel="Close"
        />
    )


};


export default ItemView;