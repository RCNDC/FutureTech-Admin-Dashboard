import React, { useEffect, useState } from 'react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const details = Object.keys(data)
            .filter(key => key !== 'name')
            .map(key => `${key}: ${data[key]}`)
            .join(', ');
        return (
            <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
                <p className="label">{`${label}`}</p>
                <p className="intro">{details}</p>
            </div>
        );
    }

    return null;
};

type ChartModule = {
    BarChart: any;
    Bar: any;
    XAxis: any;
    YAxis: any;
    CartesianGrid: any;
    Tooltip: any;
    Legend: any;
    ResponsiveContainer: any;
};

const HistogramComponent = ({ data }: { data: any[] }) => {
    const [components, setComponents] = useState<ChartModule | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        // Only attempt to load on the client
        if (typeof window === 'undefined') return;

        (async () => {
            try {
                // dynamic import so bundlers don't treat `recharts` as a static top-level import
                const mod = await import('recharts');
                if (!mounted) return;

                const resolved = {
                    BarChart: (mod as any).BarChart ?? (mod as any).default?.BarChart,
                    Bar: (mod as any).Bar ?? (mod as any).default?.Bar,
                    XAxis: (mod as any).XAxis ?? (mod as any).default?.XAxis,
                    YAxis: (mod as any).YAxis ?? (mod as any).default?.YAxis,
                    CartesianGrid: (mod as any).CartesianGrid ?? (mod as any).default?.CartesianGrid,
                    Tooltip: (mod as any).Tooltip ?? (mod as any).default?.Tooltip,
                    Legend: (mod as any).Legend ?? (mod as any).default?.Legend,
                    ResponsiveContainer: (mod as any).ResponsiveContainer ?? (mod as any).default?.ResponsiveContainer,
                };

                if (!resolved.BarChart || !resolved.Bar) {
                    throw new Error('Incomplete recharts export');
                }

                setComponents(resolved as ChartModule);
            } catch (err) {
                // Gracefully handle absence/failure to load recharts (e.g., not installed in some environments)
                // Log for debugging and show fallback UI
                // eslint-disable-next-line no-console
                console.warn('Recharts failed to load dynamically', err);
                if (mounted) setError('Chart library unavailable');
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    if (error) {
        return <div className="text-sm text-muted-foreground">Chart unavailable</div>;
    }

    if (!components) {
        return <div>Loading chart...</div>;
    }

    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = components;

    if (!data || data.length === 0) {
        return <div>No data to display</div>;
    }

    const keys = Object.keys(data[0]).filter(key => key !== 'name');

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {keys.map((key, index) => (
                    <Bar key={key} dataKey={key} stackId="a" fill={COLORS[index % COLORS.length]} />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default HistogramComponent;