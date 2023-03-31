import { NextResponse } from "next/server";
import { auditAddressSearchRecord } from "/src/utils/database/address-search";
import { getAddressInfo } from "/src/utils/blockchain";
import { AddressResponse } from "/types/utils/blockchain";
import { States } from "/types/utils/state.d.ts";

export async function GET(request, { params }) {
    const id = params.addressId;
    const { searchParams } = request.nextUrl;
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    const response: AddressResponse = await getAddressInfo(id, limit, offset);

    switch (response.state)
    {
        case States.Success:
            await auditAddressSearchRecord(id);
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