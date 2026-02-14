import { Label } from "@/components/ui/label";
import type { Route } from "./+types/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoginForm from "@/components/loginForm";


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Login - Future Tech Addis Dashboard" },
        { name: "description", content: "Login to Future Tech Event Dashboard" },
    ];
}



export default function Login() {
    return <div className="flex justify-center items-center ">
        <div className="md:w-1/2 p-6  rounded-lg shadow-lg ">
            <h2 className="text-2xl font-semibold mb-4 text-center text-purple-900">Welcome back</h2>
            <LoginForm />
        </div>
    </div>;
}