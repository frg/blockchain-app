import DynamicTable from "src/components/dynamic-table";
import { States } from "src/utils/state";
import { SuccessState, ErrorState } from "types/utils/state";
import { AddressSearchRecord, AddressSearchRecordsResponse } from "@/types/utils/database/address-search";

async function getAddressSearchAudit(): Promise<AddressSearchRecordsResponse> {
    const response = await fetch(
        `http://127.0.0.1:3000/api/address/btc/search/audit?sort_by=desc(searched_count)&limit=5&offset=0`,
        {
            next: { revalidate: 10 },
        }
    );

    switch (response.status) {
        case 200:
            const data = await response.json();
            return {
                state: States.Success,
                data: data
            } as SuccessState<AddressSearchRecord[]>;
        case 500:
        default:
            return {
                state: States.Error
            } as ErrorState;
    }
}

function renderContent(response: AddressSearchRecordsResponse) {
    switch (response.state) {
        case States.Success:
            const data = response
                .data
                .map((record: AddressSearchRecord) => ({
                    addressId: record.address_id,
                    searchedCount: record.searched_count
                }));
            return <DynamicTable data={data} />;
        case States.Error:
        default:
            return (<div></div>);
    }
}

export default async function AddressSeachAudit() {
    const response = await getAddressSearchAudit();

    return (
        <div>
            {renderContent(response)}
        </div>
    );
}