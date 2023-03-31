import { NextResponse } from "next/server";
import { auditTransactionSearchRecord } from "/src/utils/database/transaction-search";
import { getTransactionInfo } from "/src/utils/blockchain";
import { TransactionResponse } from "/types/utils/blockchain";
import { States } from "/types/utils/state.d.ts";

export async function GET(request, { params }) {
    const id = params.transactionId;

    const response: TransactionResponse = await getTransactionInfo(id);

    switch (response.state)
    {
        case States.Success:
            await auditTransactionSearchRecord(id);
            return NextResponse.json(response.data);
            break;
        case States.NotFound:
            return NextResponse.json({}, { status: 404 });
            break;
        case States.Error:
        default:
            return NextResponse.json({ error: response.error }, { status: 500 });
    }
}