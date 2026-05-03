import { Link, useLocation } from "react-router-dom";
import { FaBuilding, FaFolder, FaTasks } from "react-icons/fa";

export const Sidebar = () => {
    const location = useLocation();

    const links = [
        {
            name: "Organizations",
            path: "/organization",
            icon: <FaBuilding />,
        },
        {
            name: "Projects",
            path: "/projects",
            icon: <FaFolder />,
        },
        {
            name: "Tasks",
            path: "/tasks",
            icon: <FaTasks />,
        },
    ];

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
            <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
                <img src="/logo.png" alt="logo" className="w-9 h-9" />
                <h3 className="text-lg font-semibold text-gray-900">
                    Motion
                </h3>
            </div>

            <div className="flex flex-col gap-1 px-3 py-4">
                { links.map( ( link, index ) => {
                    const isActive = location.pathname.includes( link.path );
                    return (
                        <Link
                            key={ index }
                            to={ link.path }
                            className={ `
                                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                                ${ isActive
                                    ? "bg-blue-50 text-blue-700 border border-blue-100"
                                    : "text-gray-600 hover:bg-gray-100"
                                }
                            `}
                        >
                            <span className="text-base">{ link.icon }</span>
                            { link.name }
                        </Link>
                    );
                } ) }
            </div>
            <div className="mt-auto px-5 py-4 text-xs text-gray-400 border-t border-gray-100">
                © { new Date().getFullYear() } Motion
            </div>
        </div>
    );
};