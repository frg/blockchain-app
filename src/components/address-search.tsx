"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddressSearch() {
    const [addressId, setAddressId] = useState('');

    const router = useRouter();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddressId(event.target.value);
    };

    const handleSearch = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        router.push(`/address/btc/${addressId}`);
    };

    return (
        <form onSubmit={handleSearch}>
            <h2>Search for a address...</h2>
            <input
                type="text"
                placeholder="Enter address ID"
                value={addressId}
                onChange={handleInputChange}
            />
            <button type="submit">Search</button>
        </form>
    );
}