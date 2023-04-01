import { DynamicTableProps } from "@/types/components/dynamicTableProps";

export default function DynamicTable({ data }: DynamicTableProps) {
    const formatKey = (key: string) => {
        // Remove _str suffix
        if (key.endsWith('_str')) {
            key = key.slice(0, -4);
        }

        // Split camelCase into multiple words and capitalize the first letter of each word
        return key
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/(^|\s)([a-z])/g, (_match, space, letter) => space + letter.toUpperCase());
    };

    const isPrimitiveValue = (value: any) => {
        return typeof value !== 'object' && !Array.isArray(value);
    };

    const renderTableHeaders = ({ data }: DynamicTableProps) => {
        if (Array.isArray(data) && data.length > 0) {
            return (
                <tr>
                    {Object
                        .keys(data[0])
                        .map(key => (
                            <th key={key}>{formatKey(key)}</th>
                        ))}
                </tr>
            );
        }
        return null;
    };

    const renderTableRows = ({ data }: DynamicTableProps) => {
        if (Array.isArray(data)) {
            return data.map((item, index) => (
                <tr key={index}>
                    {Object
                        .entries(item)
                        .filter(([, value]) => isPrimitiveValue(value))
                        .map(([key, value]: [string, any]) => (
                            <td key={key}>{value}</td>
                        ))}
                </tr>
            ));
        } else {
            return Object
                .entries(data)
                .filter(([, value]) => isPrimitiveValue(value))
                .map(([key, value]) => (
                    <tr key={key}>
                        <td>{formatKey(key)}</td>
                        <td>{value}</td>
                    </tr>
                ));
        }
    };

    return (
        <table>
            <thead>
                {renderTableHeaders({ data })}
            </thead>
            <tbody>
                {renderTableRows({ data })}
            </tbody>
        </table>
    );
};