import PocketBase, { ClientResponseError } from "pocketbase";
import { States } from "src/utils/state";
import { SuccessState, ErrorState, NotFoundState } from "types/utils/state";
import {
    TransactionSearchRecordResponse,
    TransactionSearchRecord,
    TransactionSearchRecordsResponse
} from "types/utils/database/transaction-search";
import { SortBy } from "@/types/utils/api";
import { parsePagination } from "../api";
import { sortByToString } from "./database";

const pb = new PocketBase("http://127.0.0.1:8090");
const collection = "transaction_search";

export async function getTransactionSearches(limit: number = 5, offset: number = 0, sortBy: SortBy[] = [{ field: "updated", order: "desc" }]): Promise<TransactionSearchRecordsResponse> {
    const pagination = parsePagination(limit ?? 5, offset ?? 0);
    const sort = sortByToString(sortBy ?? [{ field: "updated", order: "desc" }]);

    try {
        const records = await pb
            .collection(collection)
            .getList(pagination.page, pagination.size, {
                sort: sort,
            });

        const mappedRecords: TransactionSearchRecord[] = records.items.map((item) => {
            return {
                id: item.id,
                created: item.created,
                updated: item.updated,
                transaction_id: item.transaction_id,
                searched_count: item.searched_count,
            };
        });

        return {
            state: States.Success,
            data: mappedRecords
        } as SuccessState<TransactionSearchRecord[]>;
    } catch (error) {
        return {
            state: States.Error
        } as ErrorState;
    }
}

export async function auditTransactionSearchRecord(addressId: string): Promise<TransactionSearchRecordResponse> {
    // TODO: Explore transactions for atomicity, https://pocketbase.io/docs/database/#transaction
    const exists = await getTransactionSearchRecord(addressId);

    switch (exists.state)
    {
        case States.Success:
            return await incrementTransactionSearchRecord(exists.data);
            break;
        case States.NotFound:
            return await createTransactionSearchRecord(addressId);
            break;
        case States.Error:
        default:
            return {
                state: States.Error
            } as ErrorState;
    }
}

async function incrementTransactionSearchRecord(addressSearchRecord: TransactionSearchRecord): Promise<TransactionSearchRecordResponse> {
    const data = {
        "transaction_id": addressSearchRecord.transaction_id,
        "searched_count+": 1
    };

    let record = null;
    try {
        const record = await pb
            .collection(collection)
            .update(addressSearchRecord.id, data);

        const mappedRecord: TransactionSearchRecord = {
            id: record.id,
            created: record.created,
            updated: record.updated,
            transaction_id: record.transaction_id,
            searched_count: record.searched_count
        };

        return {
            state: States.Success,
            data: mappedRecord
        } as SuccessState<TransactionSearchRecord>;
    } catch (error: any) {
        if (error.status === 404) {
            return {
                state: States.NotFound
            } as NotFoundState;
        }

        return {
            state: States.Error
        } as ErrorState;
    }
}

async function createTransactionSearchRecord(addressId: string): Promise<TransactionSearchRecordResponse> {
    const data = {
        "transaction_id": addressId,
        "searched_count": 1
    };

    let record = null;
    try {
        const record = await pb
            .collection(collection)
            .create(data);

        const mappedRecord: TransactionSearchRecord = {
            id: record.id,
            created: record.created,
            updated: record.updated,
            transaction_id: record.transaction_id,
            searched_count: record.searched_count
        };

        return {
            state: States.Success,
            data: mappedRecord
        } as SuccessState<TransactionSearchRecord>;
    } catch (error) {
        return {
            state: States.Error
        } as ErrorState;
    }
}

async function getTransactionSearchRecord(addressId: string): Promise<TransactionSearchRecordResponse> {
    try {
        const record = await pb
            .collection(collection)
            .getFirstListItem(`transaction_id="${addressId}"`);

        const mappedRecord: TransactionSearchRecord = {
            id: record.id,
            created: record.created,
            updated: record.updated,
            transaction_id: record.transaction_id,
            searched_count: record.searched_count
        };

        return {
            state: States.Success,
            data: mappedRecord
        } as SuccessState<TransactionSearchRecord>;
    } catch (error: any) {
        if (error.status === 404) {
            return {
                state: States.NotFound
            } as NotFoundState;
        }

        return {
            state: States.Error
        } as ErrorState;
    }
}

function offsetLimitToPageSizePageNumber(limit: number, offset: number): { pageSize: number; pageNumber: number } {
    const pageSize = limit;
    const pageNumber = Math.floor(offset / limit) + 1;

    return { pageSize, pageNumber };
}
