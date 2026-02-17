import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent } from "./ui/card"
import { cn } from "@/lib/utils";
import type { FC } from "react";

type StatCardProps = {
    title: string;
    totalCount: number;
    changes: number,
    icon?: React.ReactNode
}

const StatCard: FC<StatCardProps> = ({ title, totalCount, changes, icon }) => {
    return (
        <Card className="premium-card border-none overflow-hidden group">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{title}</p>
                        <h4 className="text-3xl font-black text-slate-800 tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left">
                            {totalCount.toLocaleString()}
                        </h4>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-primary/20">
                        {icon}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className={cn(
                        "flex items-center gap-1 text-[11px] font-black px-2 py-1 rounded-lg transition-colors",
                        changes >= 0 ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
                    )}>
                        {changes >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        <span>{Math.abs(Math.floor(changes))}%</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Growth snapshot</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default StatCard;