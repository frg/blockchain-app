"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TransactionSearch() {
    const [transactionId, setTransactionId] = useState('');

    const router = useRouter();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTransactionId(event.target.value);
    };

    const handleSearch = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        router.push(`/transaction/btc/${transactionId}`);
    };

    return (
        <form onSubmit={handleSearch}>
            <h2>Search for a transaction...</h2>
            <input
                type="text"
                placeholder="Enter transaction ID"
                value={transactionId}
                onChange={handleInputChange}
            />
            <button type="submit">Search</button>
        </form>
    );
}