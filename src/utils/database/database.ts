import { SortBy } from "types/utils/api";

export function sortByToString(sortByArray: SortBy[]): string {
    return sortByArray
        .map(sortBy => {
            const prefix = sortBy.order === "asc" ? "+" : "-";
            return `${prefix}${sortBy.field}`;
        })
        .join(",");
}