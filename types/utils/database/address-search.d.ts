import { SuccessState, ErrorState, NotFoundState } from "/types/utils/state"

export interface AddressSearchRecord {
    id: string;
    created: string;
    updated: string;
    address_id: string;
    searched_count: number;
}

export type AddressSearchRecordResponse = SuccessState<AddressSearchRecord> | ErrorState | NotFoundState;

export type AddressSearchRecordsResponse = SuccessState<AddressSearchRecord[]> | ErrorState | NotFoundState;
