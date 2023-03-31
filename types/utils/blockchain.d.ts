import { SuccessState, ErrorState, NotFoundState } from "/types/utils/state"

export interface AddressInfo {
    addressId: string;
    totalAmountReceived_str: string;
    totalAmountSent_str: string;
    balance_str: string;
    transactions: AddressTransaction[];
}

export interface AddressTransaction {
    transactionId: string;
    created: string;
}

export type AddressResponse = SuccessState<AddressInfo> | ErrorState | NotFoundState;

export interface TransactionInfo {
    transcationId: string;
    created: string;
    feeAmount_str: string;
    inputAmount_str: string;
    outputAmount_str: string;
}

export type TransactionResponse = SuccessState<TransactionInfo> | ErrorState | NotFoundState;
