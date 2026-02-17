import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = [
    'oklch(0.6 0.18 160)',  // Emerald (Primary)
    'oklch(0.55 0.15 200)', // Cyan
    'oklch(0.25 0.05 200)', // Midnight
    'oklch(0.8 0.1 160)',   // Light Emerald
    'oklch(0.45 0.1 200)'   // Soft Navy
];

const PieChartComponent = ({ data }: { data: any[] }) => {
    if (!data || data.length === 0) return (
        <div className="flex items-center justify-center h-[300px] text-slate-400 text-sm italic font-black uppercase tracking-widest">
            Pending distribution analysis
        </div>
    );

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={8}
                        dataKey="value"
                        nameKey="name"
                        stroke="none"
                        animationBegin={0}
                        animationDuration={1500}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                className="hover:filter hover:brightness-110 transition-all cursor-pointer focus:outline-none"
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            border: 'none',
                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                            padding: '12px'
                        }}
                        itemStyle={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        formatter={(value) => <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartComponent;
