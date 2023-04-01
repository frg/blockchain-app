import TransactionSearch from "../components/transaction-search"; 

export default function HomePage() {
    return (
        <div>
            <TransactionSearch/>
            <h2>Search for an address...</h2>
            <form id="form">
                <input type="search" id="query" name="q" placeholder="Search..." />
                <button>Search</button>
            </form>
        </div>
    );
}