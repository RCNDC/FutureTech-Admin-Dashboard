import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = [
    'oklch(0.6 0.18 160)',  // Emerald
    'oklch(0.55 0.15 200)', // Cyan
    'oklch(0.25 0.05 200)', // Midnight
    'oklch(0.8 0.1 160)',   // Light Green
    'oklch(0.45 0.1 200)'   // Navy
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-5 rounded-[20px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] border-none">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">{label}</p>
                <div className="space-y-2">
                    {payload.map((item: any, index: number) => (
                        <div key={index} className="flex items-center justify-between gap-8">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-xs font-bold text-slate-600">{item.name}</span>
                            </div>
                            <span className="text-xs font-black text-slate-950">{item.value.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

const HistogramComponent = ({ data }: { data: any[] }) => {
    if (!data || data.length === 0) return (
        <div className="flex items-center justify-center h-[350px] text-slate-400 text-sm italic font-black uppercase tracking-widest">
            Distribution data in queue...
        </div>
    );

    const keys = Object.keys(data[0]).filter(key => key !== 'name');

    return (
        <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="oklch(0.9 0.02 200)" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'oklch(0.5 0.05 200)', fontSize: 10, fontWeight: 800 }}
                        dy={12}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'oklch(0.5 0.05 200)', fontSize: 10, fontWeight: 800 }}
                    />
                    <Tooltip cursor={{ fill: 'oklch(0.6 0.18 160 / 0.05)' }} content={<CustomTooltip />} />
                    <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        wrapperStyle={{ paddingTop: '0px', paddingBottom: '30px' }}
                        formatter={(value) => <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{value}</span>}
                    />
                    {keys.map((key, index) => (
                        <Bar
                            key={key}
                            dataKey={key}
                            stackId="a"
                            fill={COLORS[index % COLORS.length]}
                            radius={index === keys.length - 1 ? [6, 6, 0, 0] : [0, 0, 0, 0]}
                            barSize={36}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HistogramComponent;