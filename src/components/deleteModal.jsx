import Button from "./button";
import Modal from "./modal";

const DeleteModal = ({ open, onClose, title, message, onConfirm, confirmLabel = "Delete", cancelLabel = "Cancel" }) => {
    return (
        <Modal open={open} onClose={onClose} title={title} size="md">
            <div className="text-gray-800 text-base leading-relaxed">
                {message}
            </div>

            <div className="flex justify-end gap-3 border-t pt-4 mt-6">
                <Button variant="secondary" onClick={onClose}> {cancelLabel} </Button>
                <Button variant="danger" onClick={onConfirm}> {confirmLabel} </Button>
            </div>
        </Modal>
    );
};

export default DeleteModal;