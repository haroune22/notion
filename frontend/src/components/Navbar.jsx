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
        <div className="flex items-center justify-end w-full h-16 border-b border-gray-300 px-6 bg-white">
            {/* RIGHT */ }
            <div className="flex items-center gap-4">
                { user ? (
                    <>
                        <p className="text-gray-700 font-medium underline underline-offset-4">
                            { user.name }
                        </p>

                        <button
                            onClick={ logout }
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-300 transition hover:cursor-pointer"
                        >
                            <FiLogOut />
                            Logout
                        </button>
                    </>
                ) : (
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                        <IoIosLogIn />
                        Login
                    </button>
                ) }
            </div>
        </div>
    );
};