import '/src/styles/globals.css';

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
                    <p>Blockchain explorer</p>
                </header>
                <main>
                    {children}
                </main>
                <footer></footer>
            </body>
        </html>
    );
}