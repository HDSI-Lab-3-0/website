import { Pagination } from "@heroui/react";

interface EventPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export default function EventPagination({
	currentPage,
	totalPages,
	onPageChange,
}: EventPaginationProps) {
	if (totalPages <= 1) return null;

	return (
		<div className="flex justify-center mt-8">
			<Pagination
				total={totalPages}
				page={currentPage}
				onChange={onPageChange}
				showControls
				showShadow
				color="primary"
				variant="bordered"
				classNames={{
					wrapper: "gap-0 overflow-visible h-12 rounded-lg border border-divider",
					item: "w-10 h-10 text-small rounded-none bg-transparent",
					cursor: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold shadow-lg",
					prev: "rounded-l-lg",
					next: "rounded-r-lg",
				}}
			/>
		</div>
	);
}