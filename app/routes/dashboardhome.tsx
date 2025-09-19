import TotalStat from "@/components/totalstats";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Future Tech Addis Dashboard" },
    { name: "description", content: "Welcome to Future Tech Event Dashboard" },
  ];
}

export function loader(){

}

export default function DashboardHome(){
    return(
        <div>
          <h3>Welcome,</h3>
            <TotalStat/>
        </div>
    )

}