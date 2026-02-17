import type { Route } from "./+types/login";
import LoginForm from "@/components/loginForm";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Gateway | Future Tech" },
        { name: "description", content: "Secure gate for Future Tech Administrators" },
    ];
}

export default function Login() {
    return (
        <div className="w-full animate-fade-in">
            {/* Minimalist Logo for Mobile Viewing */}
            <div className="lg:hidden flex justify-center mb-10">
                <img
                    src="/images/removed.png"
                    alt="Logo"
                    className="h-12 w-auto object-contain"
                />
            </div>

            <div className="mb-12">
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-3 leading-tight">
                    Welcome back.
                </h1>
                <p className="text-slate-500 font-semibold text-lg">
                    Enter your digital credentials to proceed.
                </p>
            </div>

            <div className="relative">
                {/* Visual Accent */}
                <div className="absolute -left-8 top-0 bottom-0 w-1.5 bg-emerald-500 rounded-full opacity-0 lg:opacity-100" />

                <LoginForm />
            </div>
        </div>
    );
}