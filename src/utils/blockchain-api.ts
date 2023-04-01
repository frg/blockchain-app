import { States } from "src/utils/state";
import { SuccessState, ErrorState, NotFoundState } from "types/utils/state";
import { AddressResponse, TransactionResponse, AddressInfo, TransactionInfo } from "types/utils/blockchain";
import { Currencies, satoshiToCurrency } from "src/utils/currency";
import { Currency } from '@/types/utils/currency';
import { getCurrencyRates } from "src/utils/currency-api";

export async function getAddressInfo(addressId: string, limit: number = 10, offset: number = 0, currency: Currency = Currencies.BTC): Promise<AddressResponse> {
    const url = new URL(`https://blockchain.info/rawaddr/${addressId}`);
    url.searchParams.set("limit", (limit ?? 10).toString());
    url.searchParams.set("offset", (offset ?? 0).toString());

    const response = await fetch(url, { cache: 'no-store' });
    console.info(`Request to ${url} returned status ${response.status}`);

    const currencyResponse = await getCurrencyRates();
    if (currencyResponse.state !== States.Success) {
        return {
            state: States.Error
        } as ErrorState;
    }

    switch (response.status) {
        case 200:
            const data = await response.json();

            const mappedData: AddressInfo = {
                addressId: data.address,
                totalAmountReceived_str: satoshiToCurrency(data.total_received, currency, currencyResponse.data),
                totalAmountSent_str: satoshiToCurrency(data.total_sent, currency, currencyResponse.data),
                balance_str: satoshiToCurrency(data.final_balance, currency, currencyResponse.data),
                transactions: data.txs.map((tx: any) => ({
                    transactionId: tx.hash,
                    created: new Date(tx.time * 1000).toISOString(),
                })),
            };

            return {
                state: States.Success,
                data: mappedData
            } as SuccessState<AddressInfo>;
        case 404:
            return {
                state: States.NotFound
            } as NotFoundState;
        case 500:
        default:
            return {
                state: States.Error
            } as ErrorState;
    }
}

export async function getTransactionInfo(transactionId: string, currency: Currency = Currencies.BTC): Promise<TransactionResponse> {
    const url = new URL(`https://blockchain.info/rawtx/${transactionId}`);

    const response = await fetch(url, { cache: 'no-store' });
    console.info(`Request to ${url} returned status ${response.status}`);

    const currencyResponse = await getCurrencyRates();
    if (currencyResponse.state !== States.Success) {
        return {
            state: States.Error
        } as ErrorState;
    }

    switch (response.status) {
        case 200:
            const data = await response.json();

            const totalInput = data.inputs
                .reduce((previousInput: any, input: any) => (previousInput.prev_out.value + input.prev_out.value));
            const totalOutput = data.out
                .reduce((previousOutput: any, output: any) => (previousOutput.value + output.value));

            const mappedData: TransactionInfo = {
                transcationId: data.hash,
                created: new Date(data.time * 1000).toISOString(),
                feeAmount_str: satoshiToCurrency(data.fee, currency, currencyResponse.data),
                inputAmount_str: satoshiToCurrency(totalInput, currency, currencyResponse.data),
                outputAmount_str: satoshiToCurrency(totalOutput, currency, currencyResponse.data),
            };

            return {
                state: States.Success,
                data: mappedData
            } as SuccessState<TransactionInfo>;
        case 404:
            return {
                state: States.NotFound
            } as NotFoundState;
        case 500:
        default:
            return {
                state: States.Error
            } as ErrorState;
    }
}