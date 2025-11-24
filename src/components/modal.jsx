import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const Modal = ({ open, onClose, title, children, size }) => {

    const sizeClasses = {
        sm: "max-w-md",
        md: "max-w-2xl",
        lg: "max-w-4xl",
        xl: "max-w-6xl",     // perfect for tables
    };

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
                    className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-2 sm:p-6"
                >
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }} onClick={(e) => e.stopPropagation()}
                        className={`bg-white w-full max-w-lg rounded-2xl shadow-xl p-4 sm:p-6 overflow-y-auto max-h-[95vh] min-h-[60vh] ${sizeClasses[size || "md"]}`}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                {title}
                            </h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl" >
                                ✕
                            </button>
                        </div>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;