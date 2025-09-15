import { Check, GaugeCircle, Ticket, Users } from "lucide-react";

const DashboardSideBar = ()=>{
    return(
        <div className="w-56 space-y-4 max-w-56 bg-linear-150 from-purple-900 to-purple-500 h-[91vh] p-5">
            <div className="mt-10">
                <h5 className="text-gray-300">Overview</h5>
                <ul className="my-3 ml-2">
                    <li className="flex items-center gap-2 text-white text-sm">
                        <GaugeCircle className="w-4 h-4"/>
                        Dashboard
                    </li>
                </ul>
                <h5 className="text-gray-300">Manage</h5>
                <ul className="my-3 ml-2 space-y-2">
                    <li className="flex items-center gap-2 text-white text-sm">
                        <Ticket className="w-4 h-4"/>
                        Tickets
                    </li>
                    <li className="flex items-center gap-2 text-white text-sm">
                        <Users className="w-4 h-4"/>
                        Attendees
                    </li>
                    <li className="flex items-center gap-2 text-white text-sm">
                        <Check className="w-4 h-4"/>
                        Check-in
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default DashboardSideBar;