import { Currencies, formatValue } from "src/utils/currency";
import { States } from "src/utils/state";
import { SuccessState, ErrorState } from "types/utils/state";
import { CurrencyResponse, CurrencyInfo, ApiResponse } from "types/utils/currency";

export async function getCurrencyRates(): Promise<CurrencyResponse> {
    const url = new URL("https://blockchain.info/ticker");
    const response = await fetch(url, { next: { revalidate: 1800 } });
    console.info(`Request to ${url} returned status ${response.status}`);

    switch (response.status) {
        case 200:
            const data = await response.json();
            const mappedData = mapResponse(data);

            return {
                state: States.Success,
                data: mappedData
            } as SuccessState<Record<string, CurrencyInfo>>;
        case 500:
        default:
            return {
                state: States.Error
            } as ErrorState;
    }
}

function mapResponse(apiResponse: ApiResponse): Record<string, CurrencyInfo> {
    const currencies: Record<string, CurrencyInfo> = {};

    for (const apiCode in apiResponse) {
        const code = apiCode.toUpperCase();
        const currency = Currencies[code];
        const price = apiResponse[apiCode].last;

        if (currency) {
            currencies[code] = {
                code: code,
                symbol: currency.symbol,
                format: currency.format,
                price_str: price,
                formatted_price: formatValue(price, currency)
            };
        }
    }

    return currencies;
}