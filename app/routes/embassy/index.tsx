import Fallback from "@/components/fallback";
import type { ClientLoaderFunctionArgs } from "react-router";
import type { Route } from "./+types";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - Emabassy" },
    { name: "description", content: "" },
  ];
}
export async function clientLoader({}:ClientLoaderFunctionArgs){

}

export function HydrateFallback(){
    return <Fallback/>
}
const Index = ()=>{


}

export default Index;