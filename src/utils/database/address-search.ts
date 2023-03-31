import PocketBase from "pocketbase";
import { States, SuccessState, ErrorState, NotFoundState } from "/types/utils/state.d.ts";
import {
    AddressSearchRecordResponse,
    AddressSearchRecord,
    AddressSearchRecordsResponse
} from "/types/utils/database/address-search";

const pb = new PocketBase("http://127.0.0.1:8090");

export async function getTopSearchedAddresses(limit: number = 5, offset: number = 0): Promise<AddressSearchRecordsResponse> {
    const collection = "address_search";
    const pageFilter = offsetLimitToPageSizePageNumber(limit, offset);

    let record = null;
    try {
        const records = await pb
            .collection(collection)
            .getList(pageFilter.pageNumber, pageFilter.pageSize, {
                sort: '+searched_count',
            });

        const mappedRecords: AddressSearchRecord[] = records.items.map((item) => {
            return {
                id: item.id,
                created: item.created,
                updated: item.updated,
                address_id: item.address_id,
                searched_count: item.searched_count,
            };
        });

        return {
            state: States.Success,
            data: mappedRecords
        } as SuccessState<AddressSearchRecord[]>;
    } catch (error) {
        return {
            state: States.Error
        } as ErrorState;
    }
}

export async function auditAddressSearchRecord(addressId: string): Promise<AddressSearchRecordResponse> {
    // TODO: Add distributed lock since PocketBase does not have transactions
    const exists = await getAddressSearchRecord(addressId);

    switch (exists.state)
    {
        case States.Success:
            return await incrementAddressSearchRecord(exists.data);
            break;
        case States.NotFound:
            return await createAddressSearchRecord(addressId);
            break;
        case States.Error:
        default:
            return {
                state: States.Error
            } as ErrorState;
    }
}

async function incrementAddressSearchRecord(addressSearchRecord: AddressSearchRecord): Promise<AddressSearchRecordResponse> {
    const collection = "address_search";
    const data = {
        "address_id": addressSearchRecord.address_id,
        "searched_count+": 1
    };

    let record = null;
    try {
        const record = await pb
            .collection(collection)
            .update(addressSearchRecord.id, data);

        const mappedRecord: AddressSearchRecord = {
            id: record.id,
            created: record.created,
            updated: record.updated,
            address_id: record.address_id,
            searched_count: record.searched_count
        };

        return {
            state: States.Success,
            data: mappedRecord
        } as SuccessState<AddressSearchRecord>;
    } catch (error) {
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

async function createAddressSearchRecord(addressId: string): Promise<AddressSearchRecordResponse> {
    const collection = "address_search";
    const data = {
        "address_id": addressId,
        "searched_count": 1
    };

    let record = null;
    try {
        const record = await pb
            .collection(collection)
            .create(data);

        const mappedRecord: AddressSearchRecord = {
            id: record.id,
            created: record.created,
            updated: record.updated,
            address_id: record.address_id,
            searched_count: record.searched_count
        };

        return {
            state: States.Success,
            data: mappedRecord
        } as SuccessState<AddressSearchRecord>;
    } catch (error) {
        return {
            state: States.Error
        } as ErrorState;
    }
}

async function getAddressSearchRecord(addressId: string): Promise<AddressSearchRecordResponse> {
    const collection = "address_search";

    let record = null;
    try {
        const record = await pb
            .collection(collection)
            .getFirstListItem(`address_id="${addressId}"`);

        const mappedRecord: AddressSearchRecord = {
            id: record.id,
            created: record.created,
            updated: record.updated,
            address_id: record.address_id,
            searched_count: record.searched_count
        };

        return {
            state: States.Success,
            data: mappedRecord
        } as SuccessState<AddressSearchRecord>;
    } catch (error) {
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
