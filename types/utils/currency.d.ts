import { SuccessState, ErrorState, NotFoundState } from "/types/utils/state";

export type Currency = {
    code: string;
    symbol: string;
    format: string;
};

export interface CurrencyInfo {
    code: string;
    symbol: string;
    format: string;
    price_str: string;
    formatted_price: string;
};

export type CurrencyResponse = SuccessState<Record<string, CurrencyInfo>> | ErrorState | NotFoundState;

type ApiResponse = {
    [key: string]: {
      "15m": string;
      last: string;
      buy: string;
      sell: string;
      symbol: string;
    };
  };