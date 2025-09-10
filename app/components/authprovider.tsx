import axiosInstance from "@/lib/axiosinstance";
import { createContext, useEffect, useState } from "react";
import { redirect } from "react-router";

type authContextType = {
    token: string | null,
    setToken:  React.Dispatch<React.SetStateAction<string | null>>
} | null
const authContext = createContext<authContextType>(null);

export default function AuthProvider({children}: {children: React.ReactNode}){
    const [token, setToken] = useState<string | null>(null);
    useEffect(()=>{
        if(!token){
            axiosInstance.post('/refresh-token',null).then(res=>{
                const data = res.data;
                if(data){
                    setToken(data.accessToken);
                }
            }).catch(err=>{
                
            })
        }
    },[token]);

    return(
        <authContext.Provider value={{setToken, token}}>
            {children}
        </authContext.Provider>
    )

}

export function useAuth(){
    if(!authContext){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContext;
}