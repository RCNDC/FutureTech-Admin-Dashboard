import axiosInstance from "@/lib/axiosinstance";
import { createContext, useContext, useEffect, useState } from "react";
import { redirect, useLocation, useNavigate } from "react-router";
import Loading from "./loading";
import { GetUser, useUserStore } from "store/userstore";
import { AxiosError } from "axios";

type authContextType = {
    token: string | null,
    setToken: React.Dispatch<React.SetStateAction<string | null>>
} | null
const authContext = createContext<authContextType>(null);

const excludedPath = ['/register', '/forgot-password', '/reset-password']

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, setUser } = useUserStore()

    useEffect(() => {
        const initAuth = async () => {
            if (!token) {
                try {
                    const res = await axiosInstance.post('/auth/refresh-token');
                    if (res.data?.accessToken) {
                        setToken(res.data.accessToken);
                    } else {
                        setIsInitialLoading(false);
                    }
                } catch (err) {
                    if (!excludedPath.includes(location.pathname)) {
                        navigate('/login');
                    }
                    setIsInitialLoading(false);
                }
            } else {
                if (!user) {
                    try {
                        const userData = await GetUser(token);
                        setUser(userData);
                    } catch (err) {
                        if ((err as any).status === 401) {
                            navigate('/login');
                        }
                    } finally {
                        setIsInitialLoading(false);
                    }
                } else {
                    setIsInitialLoading(false);
                }
            }
        };

        initAuth();
    }, [token, navigate, user, setUser]);

    if (isInitialLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <Loading />
                    <p className="text-sm font-medium text-gray-500 animate-pulse">Authenticating...</p>
                </div>
            </div>
        );
    }

    return (
        <authContext.Provider value={{ setToken, token }}>
            {children}
        </authContext.Provider>
    )
}

export function useAuth() {
    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return useContext(authContext);
}