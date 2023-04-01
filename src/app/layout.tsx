import "/src/styles/globals.css";
import TransactionSearch from "src/components/transaction-search"; 
import AddressSearch from "src/components/address-search"; 

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <body>
                <header>
                    <h1>Blockchain App</h1>
                    {/* <p>Blockchain explorer</p> */}
                </header>
                <main>
                    <TransactionSearch/>
                    <AddressSearch/>
                    {children}
                </main>
                <footer></footer>
            </body>
        </html>
    );
}