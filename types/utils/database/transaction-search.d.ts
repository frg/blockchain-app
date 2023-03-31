import { SuccessState, ErrorState, NotFoundState } from "/types/utils/state"

export interface TransactionSearchRecord {
    id: string;
    created: string;
    updated: string;
    transaction_id: string;
    searched_count: number;
}

export type TransactionSearchRecordResponse = SuccessState<TransactionSearchRecord> | ErrorState | NotFoundState;

export type TransactionSearchRecordsResponse = SuccessState<TransactionSearchRecord[]> | ErrorState | NotFoundState;
