import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "./button";

const PaginationControls = ({ currentPage, totalPages, setCurrentPage }) => {
    return (
        <div className="flex justify-end items-center gap-2 mt-4 px-4 py-2 text-sm">
            <Button
                variant="pagination"
                type="button"
                className="px-3 py-1"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <FaChevronLeft/>
            </Button>

            <span className="px-2 text-gray-600">
                Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
            </span>

            <Button
                variant="pagination"
                type="button"
                className="px-3 py-1"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
            >
                <FaChevronRight/>
            </Button>
        </div>
    );
};

export default PaginationControls;
