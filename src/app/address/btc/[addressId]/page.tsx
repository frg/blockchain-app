import DynamicTable from "src/components/dynamic-table";
import { States } from "src/utils/state";
import { SuccessState, ErrorState, NotFoundState } from "types/utils/state";
import { AddressResponse, AddressInfo } from "types/utils/blockchain";
import AddressSeachAudit from "@/src/components/address-search-audit";

async function getAddress(addressId: string): Promise<AddressResponse> {
    const response = await fetch(
        `http://127.0.0.1:3000/api/address/btc/${addressId}`,
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
            } as SuccessState<AddressInfo>;
        case 404:
            return {
                state: States.NotFound
            } as NotFoundState;
        case 500:
        default:
            return {
                state: States.Error
            } as ErrorState;
    }
}

function renderContent(response: AddressResponse) {
    switch (response.state) {
        case States.Success:
            return (
                <div>
                    <DynamicTable data={response.data} />
                    <DynamicTable data={response.data.transactions} />
                </div>
            );
        case States.Error:
            return (
                <div>
                    <h4>There was an error when attempting to fetch address details</h4>
                    <small>Please provide another address or refresh the page to attempt the search again</small>
                </div>
            );   
        case States.NotFound:
        default:
            return (
                <div>
                    <h4>The address provided was not found</h4>
                    <small>Please provide another address or refresh the page to attempt the search again</small>
                </div>
            );
    }
}

export default async function AddressPage({ params }: any) {
    const response = await getAddress(params.addressId);

    return (
        <div>
            <h3>address/btc/{params.addressId}</h3>
            {renderContent(response)}

            <h3>Top 5 searched addresses</h3>
            {/* @ts-expect-error Server Component */}
            <AddressSeachAudit/>
        </div>
    );
}