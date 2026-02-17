import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center lg:grid lg:grid-cols-[1fr_1.2fr] overflow-hidden font-sans">
            {/* Left Side: Content Area */}
            <div className="w-full max-w-[500px] lg:max-w-none px-8 py-12 flex flex-col items-center justify-center relative z-10 bg-white lg:bg-transparent h-full">
                <div className="w-full max-w-[420px]">
                    <Outlet />
                </div>
            </div>

            {/* Right Side: Visual Brand Area */}
            <div className="hidden lg:block relative h-full bg-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(16,185,129,0.15)_0%,_transparent_50%),radial-gradient(circle_at_70%_80%,_rgba(14,165,233,0.1)_0%,_transparent_50%)]" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center">
                    <div className="relative mb-12">
                        <div className="absolute -inset-8 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
                        <img
                            src="/images/removed.png"
                            alt="Future Tech"
                            className="relative w-64 h-auto brightness-0 invert drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        />
                    </div>
                </div>

                {/* Subtle Decorative Elements */}
                <div className="absolute bottom-10 left-10 right-10 flex justify-between">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent opacity-50" />
                </div>
            </div>
        </div>
    );
}