import { Check, FormInput, GaugeCircle, Ticket, User, Users } from "lucide-react";
import { Link } from "react-router";

const DashboardSideBar = () => {

  return (
      <div className="md:w-56 space-y-4 max-w-56 bg-linear-150 from-purple-900 to-purple-500 md:h-[91vh] h-screen p-5 shadow-md  relative  z-99999">
          <div className="mt-10 space-y-2">
              <h5 className="text-gray-300">Overview</h5>
              <ul className="my-3 ml-2">
                  <li className=" text-white text-sm">
                      <Link to="/dashboard/home" className="flex items-center gap-2">
                          <GaugeCircle className="w-4 h-4" />
                          Dashboard
                      </Link>
                  </li>
              </ul>
              <h5 className="text-gray-300">Submissions</h5>
              <ul className="space-x-0.5 space-y-2">
                  <li className="text-white text-sm">
                      <Link to='/dashboard/submission/ngo' className="flex items-center gap-2">
                          <FormInput className="w-5 h-5" />
                          NGO
                      </Link>
                  </li>
                  <li className="text-white text-sm">
                      <Link to='/dashboard/submission/localcompany' className="flex items-center gap-2">
                          <FormInput className="w-5 h-5" />
                          Local Companies
                      </Link>
                  </li>
                  <li className="text-white text-sm">
                      <Link to='/dashboard/submission/internationalcompany' className="flex items-center gap-2">
                          <FormInput className="w-5 h-5" />
                          International Companies
                      </Link>
                  </li>
                  <li className="text-white text-sm">
                      <Link to='/dashboard/submission/embassies' className="flex items-center gap-2">
                          <FormInput className="w-5 h-5" />
                          Embassies
                      </Link>
                  </li>
                  <li className="text-white text-sm">
                      <Link to='/dashboard/submission/startups' className="flex items-center gap-2">
                          <FormInput className="w-5 h-5" />
                          Startups
                      </Link>
                  </li>
              </ul>
              <h5 className="text-gray-300">Event Management</h5>
              <ul className="my-3 ml-2 space-y-2">
                  <li className="flex items-center gap-2 text-white text-sm">
                      <Ticket className="w-4 h-4" />
                      Tickets
                  </li>
                  <li className="flex items-center gap-2 text-white text-sm">
                      <Link to="/dashboard/attendees" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Attendees
                      </Link>
                  </li>
                  <li className=" text-white text-sm">
                      <Link to='/dashboard/checkin' className="flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          Check-in
                      </Link>
                  </li>
                  <li className=" text-white text-sm">
                      <Link to="/dashboard/users" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Users
                      </Link>
                  </li>
              </ul>
          </div>

      </div>
  )
};

   

export default DashboardSideBar;
