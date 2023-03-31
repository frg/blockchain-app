export const enum States {
    Default = "uknown",
    Success = "success",
    Error = "error",
    NotFound = "not found"
};

export type SuccessState<T> = {
    state: States.Success;
    data: T;
};

export type ErrorState = {
    state: States.Error;
    error: "";
};

export type NotFoundState = {
    state: States.NotFound;
};