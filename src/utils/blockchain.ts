import { States } from "src/utils/state";
import { SuccessState, ErrorState, NotFoundState } from "types/utils/state";
import { AddressResponse, TransactionResponse, AddressInfo, TransactionInfo } from "types/utils/blockchain";

export async function getAddressInfo(addressId: string, limit: number = 10, offset: number = 0): Promise<AddressResponse> {
    const url = new URL(`https://blockchain.info/rawaddr/${addressId}`);
    url.searchParams.set("limit", (limit ?? 10).toString());
    url.searchParams.set("offset", (offset ?? 0).toString());
    
    const response = await fetch(url, { next: { revalidate: 30 } });
    console.info(`Request to ${url} returned status ${response.status}`);

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
    
    const response = await fetch(url, { next: { revalidate: 30 } });
    console.info(`Request to ${url} returned status ${response.status}`);

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