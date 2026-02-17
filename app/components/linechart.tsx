import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineChartComponent = ({ data }: { data: any[] }) => {
  if (!data || data.length === 0) return (
    <div className="flex items-center justify-center h-[350px] text-slate-400 text-sm italic font-medium">
      System performance trends ...
    </div>
  );

  const EMERALD = 'oklch(0.6 0.18 160)';
  const SLATE_MUTED = 'oklch(0.5 0.05 200)';
  const SLATE_BORDER = 'oklch(0.9 0.02 200)';

  return (
    <div className="h-[350px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="linePulse" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={EMERALD} stopOpacity={0.1} />
              <stop offset="95%" stopColor={EMERALD} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={SLATE_BORDER} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: SLATE_MUTED, fontSize: 10, fontWeight: 800 }}
            dy={12}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: SLATE_MUTED, fontSize: 10, fontWeight: 800 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '16px',
              border: 'none',
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)',
              padding: '16px'
            }}
            itemStyle={{ fontSize: '13px', fontWeight: '900', color: EMERALD }}
            cursor={{ stroke: EMERALD, strokeWidth: 1, strokeDasharray: '6 6' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={EMERALD}
            strokeWidth={4}
            dot={{ r: 5, fill: 'white', stroke: EMERALD, strokeWidth: 3 }}
            activeDot={{ r: 8, fill: EMERALD, stroke: 'white', strokeWidth: 3 }}
            animationDuration={2500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
