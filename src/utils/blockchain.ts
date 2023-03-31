import { States, SuccessState, ErrorState, NotFoundState } from "/types/utils/state.d.ts";
import { AddressResponse, TransactionResponse } from "/types/utils/blockchain";

export async function getAddressInfo(addressId: string, limit: int = 10, offset: int = 0): Promise<AddressResponse> {
    const url = new URL(`https://blockchain.info/rawaddr/${addressId}`);
    url.searchParams.set("limit", limit ?? 10);
    url.searchParams.set("offset", offset ?? 0);
    
    const response = await fetch(url);

    if (response.status === 404) {
        return {
            state: States.NotFound
        } as NotFoundState;
    }

    const data = await response.json();

    const mappedData: AddressInfo = {
        addressId: data.address,
        totalAmountReceived_str: (data.total_received / 1e8).toFixed(8),
        totalAmountSent_str: (data.total_sent / 1e8).toFixed(8),
        balance_str: (data.final_balance / 1e8).toFixed(8),
        transactions: data.txs.map((tx: any) => ({
            transactionId: tx.hash,
            created: new Date(tx.time * 1000).toISOString(),
        })),
    };

    return {
        state: States.Success,
        data: mappedData
    } as SuccessState<AddressInfo>;
}

export async function getTransactionInfo(transactionId: string): Promise<TransactionResponse> {
    const url = new URL(`https://blockchain.info/rawtx/${transactionId}`);
    
    const response = await fetch(url);

    if (response.status === 404) {
        return {
            state: States.NotFound
        } as NotFoundState;
    }

    const data = await response.json();

    const mappedData: TransactionInfo = {
        transcationId: data.hash,
        created: new Date(data.time * 1000).toISOString(),
        feeAmount_str: (data.fee / 1e8).toFixed(8),
        inputAmount_str: (data.inputs
            .reduce((previousInput: any, input: any) => 
                (previousInput.prev_out.value + input.prev_out.value)) / 1e8).toFixed(8),
        outputAmount_str: (data.out
            .reduce((previousOutput: any, output: any) => 
                (previousOutput.value + output.value)) / 1e8).toFixed(8),
    };

    return {
        state: States.Success,
        data: mappedData
    } as SuccessState<TransactionInfo>;
}

// import { SatoshisToBtcFunction } from '../../types/utils/blockchain';

// export const satoshisToBtc: SatoshisToBtcFunction = (value) => {
//     // 1) Convert value to string
//     // 2) Pad value with a minimum of 8 zeros. This accounts for max BTC precision
//     // 3) Convert to Number
//     // 4) Divide by 100000000, to move the decimal point
//     // 5) Convert to fixed to avoid exponents
//     return (Number(String(value).padStart(8, "0")) / 100000000).toFixed(8);
// };