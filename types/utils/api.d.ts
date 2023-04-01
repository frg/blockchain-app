export type SortBy = {
    field: string;
    order: "asc" | "desc";
};

export type Pagination = {
    size: number;
    page: number;
};