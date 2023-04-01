import DynamicTable from "src/components/dynamic-table";
import { States } from "src/utils/state";
import { SuccessState, ErrorState, NotFoundState } from "types/utils/state";
import { TransactionResponse, TransactionInfo } from "types/utils/blockchain";

async function getTransaction(transactionId: string): Promise<TransactionResponse> {
    const response = await fetch(
        `http://127.0.0.1:3000/api/transaction/btc/${transactionId}`,
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
            } as SuccessState<TransactionInfo>;
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

export default async function TransactionPage({ params }: any) {
    const response = await getTransaction(params.transactionId);

    return (
        <div>
            <h3>transaction/btc/{params.transactionId}</h3>
            {response.state === States.Success ? (
                <DynamicTable data={response.data} />
            ) : (
                <div>
                    <h4>The transaction provided was not found</h4>
                    <small>Please provide another transaction or refresh the page to attempt the search again.</small>
                </div>
            )}
        </div>
    );
}