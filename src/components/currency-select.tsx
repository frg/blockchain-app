"use client";

import { useState } from 'react';

export default function CurrencySelect() {
    const [currencyCode, setCurrencyCode] = useState('');
    const currencies = ["BTC", "EUR", "USD"];

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCurrency = event.target.value;
        setCurrencyCode(newCurrency);
    };

    return (
        <div>
            <label htmlFor="currency-selector">Select currency:</label>
            <select id="currency-selector" value={currencyCode} onChange={handleChange}>
                {currencies.map((currency, index) => (
                    <option key={index} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
        </div>
    );
}