import { Check, GaugeCircle, Ticket, User, Users } from "lucide-react";
import { Link } from "react-router";

const DashboardSideBar = ()=>{
    return(
        <div className="w-56 space-y-4 max-w-56 bg-linear-150 from-purple-900 to-purple-500 h-[91vh] p-5">
            <div className="mt-10 space-y-2">
                <h5 className="text-gray-300">Overview</h5>
                <ul className="my-3 ml-2">
                    <li className=" text-white text-sm">
                        <Link to="/dashboard/home" className="flex items-center gap-2">
                            <GaugeCircle className="w-4 h-4"/>
                            Dashboard
                        </Link>
                    </li>
                </ul>
                <h5 className="text-gray-300">Participants</h5>
                <ul>
                    <li className="flex items-center gap-2 text-white text-sm">
                        <User className="w-5 h-5"/>
                        Emabassy Delegation
                    </li>
                </ul>
                <h5 className="text-gray-300">Event Manage</h5>
                <ul className="my-3 ml-2 space-y-2">
                    <li className="flex items-center gap-2 text-white text-sm">
                        <Ticket className="w-4 h-4"/>
                        Tickets
                    </li>
                    <li className="flex items-center gap-2 text-white text-sm">
                        <Users className="w-4 h-4"/>
                        Attendees
                    </li>
                    <li className=" text-white text-sm">
                        <Link to='/dashboard/checkin'  className="flex items-center gap-2">
                            <Check className="w-4 h-4"/>
                            Check-in
                        </Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default DashboardSideBar;