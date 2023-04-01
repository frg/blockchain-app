import { NextResponse } from "next/server";
import { auditTransactionSearchRecord } from "src/utils/database/transaction-search";
import { getTransactionInfo } from "@/src/utils/blockchain-api";
import { TransactionResponse } from "types/utils/blockchain";
import { States } from "src/utils/state";
import { Currencies } from "src/utils/currency";

export async function GET(request: any, { params }: any) {
    const id = params.transactionId;
    const { searchParams } = request.nextUrl;
    const currencyCode = searchParams.get("currency") ?? Currencies.BTC.code;

    const currency = Currencies[currencyCode.toUpperCase()];
    if (currency === undefined) {
        return NextResponse.json(
            { message: `Currency value invalid. Supported currencies are ${Object.keys(Currencies).join(", ")}` }, 
            { status: 400 });
    }

    const response: TransactionResponse = await getTransactionInfo(id, currency);

    switch (response.state)
    {
        case States.Success:
            await auditTransactionSearchRecord(id);
            return NextResponse.json(response.data);
        case States.NotFound:
            return NextResponse.json({}, { status: 404 });
        case States.Error:
        default:
            return NextResponse.json({ error: response.error }, { status: 500 });
    }
}