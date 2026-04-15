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
            path: "/projects/123",
            icon: <FaFolder />,
        },
        {
            name: "Tasks",
            path: "/tasks/123",
            icon: <FaTasks />,
        },
    ];

    return (
        <div className="w-64 h-screen border-r border-gray-300 p-4">
            <div className="flex flex-col gap-4">
                { links.map( ( link, index ) => {
                    const isActive = location.pathname.includes( link.path );

                    return (
                        <Link
                            key={ index }
                            to={ link.path }
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