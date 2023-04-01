import DynamicTable from "src/components/dynamic-table";
import { States } from "src/utils/state";
import { SuccessState, ErrorState } from "types/utils/state";
import { TransactionSearchRecord, TransactionSearchRecordsResponse } from "@/types/utils/database/transaction-search";

async function getTransactionSearchAudit(): Promise<TransactionSearchRecordsResponse> {
    const response = await fetch(
        `http://127.0.0.1:3000/api/transaction/btc/search/audit?sort_by=desc(searched_count)&limit=5&offset=0`,
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
            } as SuccessState<TransactionSearchRecord[]>;
        case 500:
        default:
            return {
                state: States.Error
            } as ErrorState;
    }
}

function renderContent(response: TransactionSearchRecordsResponse) {
    switch (response.state) {
        case States.Success:
            const data = response
                .data
                .map((record: TransactionSearchRecord) => ({
                    transactionId: record.transaction_id,
                    searchedCount: record.searched_count
                }));
            return <DynamicTable data={data} />;
        case States.Error:
        default:
            return (<div></div>);
    }
}

export default async function TransactionSeachAudit() {
    const response = await getTransactionSearchAudit();

    return (
        <div>
            {renderContent(response)}
        </div>
    );
}