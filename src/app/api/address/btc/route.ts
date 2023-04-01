import { States } from "@/src/utils/state";
import { AddressSearchRecordsResponse } from "@/types/utils/database/address-search";
import { NextResponse } from "next/server";
import { parseSortString } from "src/utils/api";
import { getAddressSearches } from "src/utils/database/address-search";

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

    const response: AddressSearchRecordsResponse = await getAddressSearches(limit, offset, parsedSortBy);

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

