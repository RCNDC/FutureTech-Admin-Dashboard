import React, { useEffect, useState } from 'react';

/**
 * Client-safe LineChart component.
 *
 * - Does not statically import `recharts` (avoids build-time resolution issues).
 * - Dynamically imports `recharts` on the client and renders a chart when available.
 * - Falls back to a simple placeholder when the library cannot be loaded.
 *
 * Note: dynamic import still requires the package to be installed for runtime usage.
 */
type ChartModule = {
  LineChart: any;
  Line: any;
  XAxis: any;
  YAxis: any;
  CartesianGrid: any;
  Tooltip: any;
  Legend: any;
};

const LineChartComponent = ({ data }: { data: any[] }) => {
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

        // Some bundlers may re-export components under default; normalize both shapes
        const resolved = {
          LineChart: (mod as any).LineChart ?? (mod as any).default?.LineChart,
          Line: (mod as any).Line ?? (mod as any).default?.Line,
          XAxis: (mod as any).XAxis ?? (mod as any).default?.XAxis,
          YAxis: (mod as any).YAxis ?? (mod as any).default?.YAxis,
          CartesianGrid: (mod as any).CartesianGrid ?? (mod as any).default?.CartesianGrid,
          Tooltip: (mod as any).Tooltip ?? (mod as any).default?.Tooltip,
          Legend: (mod as any).Legend ?? (mod as any).default?.Legend,
        };

        // If essential parts are missing, treat as an error
        if (!resolved.LineChart || !resolved.Line) {
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

  const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } = components;

  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
};

export default LineChartComponent;
