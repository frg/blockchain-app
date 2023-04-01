interface DynamicTableProps {
    data: Record<string, any>;
}

export default function DynamicTable({ data }: DynamicTableProps) {
    const formatKey = (key: string) => {
        // Remove _str suffix
        if (key.endsWith('_str')) {
            key = key.slice(0, -4);
        }

        // Split camelCase into multiple words and capitalize the first letter of each word
        return key
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/(^|\s)([a-z])/g, (match, space, letter) => space + letter.toUpperCase());
    };

    return (
        <table>
            <tbody>
                {Object.entries(data).map(([key, value]) => (
                    <tr key={key}>
                        <td>{formatKey(key)}</td>
                        <td>{value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
