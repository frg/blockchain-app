import { NextResponse } from "next/server";
import { auditAddressSearchRecord } from "src/utils/database/address-search";
import { getAddressInfo } from "@/src/utils/blockchain-api";
import { AddressResponse } from "types/utils/blockchain";
import { States } from "src/utils/state";
import { Currencies } from "src/utils/currency";

export async function GET(request: any, { params }: any) {
    const id = params.addressId;
    const { searchParams } = request.nextUrl;
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");
    const currencyCode = searchParams.get("currency") ?? Currencies.BTC.code;

    const currency = Currencies[currencyCode.toUpperCase()];
    if (currency === undefined) {
        return NextResponse.json(
            { message: `Currency value invalid. Supported currencies are ${Object.keys(Currencies).join(", ")}` }, 
            { status: 400 });
    }

    const response: AddressResponse = await getAddressInfo(id, limit, offset, currency);

    switch (response.state)
    {
        case States.Success:
            await auditAddressSearchRecord(id);
            return NextResponse.json(response.data);
        case States.NotFound:
            return NextResponse.json({}, { status: 404 });
        case States.Error:
        default:
            return NextResponse.json({ error: response.error }, { status: 500 });
    }
}