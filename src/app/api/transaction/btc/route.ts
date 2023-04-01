import { getTransactionSearches } from "@/src/utils/database/transaction-search";
import { States } from "@/src/utils/state";
import { TransactionSearchRecordsResponse } from "@/types/utils/database/transaction-search";
import { NextResponse } from "next/server";
import { parseSortString } from "src/utils/api";

export async function GET(request: any) {
    const { searchParams } = request.nextUrl;
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");
    const sortBy = searchParams.get("sort_by");

    let parsedSortBy;
    try {
        parsedSortBy = parseSortString(sortBy);
    } catch (_error) {
        return NextResponse.json(
            { message: "Could not parse 'sort_by' filter. A valid example would be '...sort_by=desc(created),asc(user_id)'" }, 
            { status: 400 });
    }

    const response: TransactionSearchRecordsResponse = await getTransactionSearches(limit, offset, parsedSortBy);

    switch (response.state)
    {
        case States.Success:
            return NextResponse.json(response.data);
        case States.NotFound:
            return NextResponse.json({}, { status: 404 });
        case States.Error:
        default:
            return NextResponse.json({ error: response.error }, { status: 500 });
    }
    
}

