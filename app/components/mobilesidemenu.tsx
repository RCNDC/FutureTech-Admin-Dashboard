export const MobileSideMenu = ()=>{
    return(
        <>
        <div id="sidebar-backdrop" className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden hidden" ></div>
        <aside id="sidebar" className="fixed inset-y-0 left-0 w-64 bg-purple-600 text-white flex flex-col shadow-lg transform -translate-x-full transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 z-50">
            <div className="p-6 flex items-center justify-between">
                
                <div className="flex items-center space-x-2">
                    <img src="https://placehold.co/32x32/ffffff/000000?text=20" alt="Logo" className="rounded-lg"/>
                    <span className="text-xl font-bold">Future</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
               
                <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors duration-200">
                    <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    <span>Overview</span>
                </a>
                <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors duration-200">
                    <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                    <span>Dashboard</span>
                </a>
                <span className="text-xs font-semibold uppercase text-purple-200 px-4 py-2 mt-4 block">Participants</span>
                <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors duration-200">
                    <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <span>Embassy Delegation</span>
                </a>
                <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors duration-200">
                    <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <span>Attendees</span>
                </a>
                <span className="text-xs font-semibold uppercase text-purple-200 px-4 py-2 mt-4 block">Event Manage</span>
                <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors duration-200">
                    <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <span>Tickets</span>
                </a>
                <a href="#" className="flex items-center px-4 py-3 rounded-lg bg-white bg-opacity-20 font-semibold transition-colors duration-200">
                    <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                    <span>Check-in</span>
                </a>
            </nav>
        </aside>
        </>
    )
}