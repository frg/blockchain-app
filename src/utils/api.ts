import { SortBy, Pagination } from "types/utils/api";

export function parseSortString(sortString: string): SortBy[] {
    return sortString
        .split(",")
        .map((item) => {
            const [order, field] = item.split("(");

            if (order !== "asc" && order !== "desc") {
                throw new Error(`Invalid order value: ${order}. Expected "asc" or "desc".`);
            }

            return {
                field: field.slice(0, -1),
                order,
            };
        });
}

export function parsePagination(limit: number, offset: number): Pagination {
    const pageSize = limit;
    const pageNumber = Math.floor(offset / limit) + 1;

    return { size: pageSize, page: pageNumber };
}