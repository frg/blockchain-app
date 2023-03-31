import { TransactionSeach } from "/src/components/transaction-search"; 

export default function HomePage() {
    return (
        <div>
            {/* <TransactionSeach/> */}
            <h2>Search for an address...</h2>
            <form id="form">
                <input type="search" id="query" name="q" placeholder="Search..." />
                <button>Search</button>
            </form>
        </div>
    );
}