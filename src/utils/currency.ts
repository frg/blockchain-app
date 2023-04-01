import BigNumber from 'bignumber.js';
import { Currency, CurrencyInfo } from "@/types/utils/currency";

export const Currencies: Record<string, Currency> = {
    BTC: {
        code: "BTC",
        symbol: "₿",
        format: "₿{value}",
    },
    EUR: {
        code: "EUR",
        symbol: "€",
        format: "€{value}",
    },
    USD: {
        code: "USD",
        symbol: "$",
        format: "${value}",
    }
};

export function formatValue(value: string, currency: Currency) {
    return currency.format.replace("{value}", value.toString());
}

export function satoshiToCurrency(value: number, currency: Currency, rates: Record<string, CurrencyInfo>) : string {
    const valueInBtc = (value / 1e8).toFixed(8);
    if (currency.code === Currencies.BTC.code) {
        return valueInBtc;
    }

    const rate = rates[currency.code].price_str;
    return BigNumber(rate).multipliedBy(valueInBtc).toString();
}