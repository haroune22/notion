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
        <div className="w-64 h-screen border-r border-gray-300 p-4">
            <div className="flex items-center gap-3 border-b-2 border-gray-300 pb-2 mb-2">
                <img src="/logo.png" alt="logo" className="w-10 h-10" />
                <h3 className="text-lg font-semibold text-gray-800">
                    Motion
                </h3>
            </div>
            <div className="flex flex-col gap-6 mt-6">
                { links.map( ( link, index ) => {
                    const isActive = location.pathname.includes( link.path );

                    return (
                        <Link
                            key={ index }
                            className={ `flex items-center gap-3 px-4 py-2 rounded-lg transition 
              ${ isActive
                                    ? "bg-blue-100 text-blue-700"
                                    : "hover:bg-gray-100"
                                }` }
                        >
                            <span>{ link.icon }</span>
                            <span className="font-medium">{ link.name }</span>
                        </Link>
                    );
                } ) }
            </div>
        </div>
    );
};