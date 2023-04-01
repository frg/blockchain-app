export type SuccessState<T> = {
    state: "success";
    data: T;
};

export type ErrorState = {
    state: "error";
    error: "";
};

export type NotFoundState = {
    state: "not found";
};