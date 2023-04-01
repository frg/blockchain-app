import TransactionSearch from "src/components/transaction-search"; 
import AddressSearch from "src/components/address-search"; 

export default function HomePage() {
    return (
        <div>
            <TransactionSearch/>
            <AddressSearch/>
        </div>
    );
}