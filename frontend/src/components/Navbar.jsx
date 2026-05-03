import { useAuth } from "../context/AuthContext";
import { IoIosLogIn } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export const Navbar = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        await api.post( "/auth/logout" );
        setUser( null );
        navigate( "/" );
    };

    return (
        <div className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6">
            <div className="flex items-center gap-3">
                { user ? (
                    <>
                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold uppercase">
                            { user.name?.charAt( 0 ) }
                        </div>

                        <div className="flex flex-col leading-tight">
                            <p className="text-sm font-medium text-gray-900">
                                { user.name }
                            </p>
                            <p className="text-xs text-gray-400">
                                Online
                            </p>
                        </div>

                        <button
                            onClick={ logout }
                            className="ml-3 flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
                        >
                            <FiLogOut />
                            Logout
                        </button>
                    </>
                ) : (
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
                        <IoIosLogIn />
                        Login
                    </button>
                ) }
            </div>
        </div>
    );
};