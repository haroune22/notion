import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { setUser, loading } = useAuth();

    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );

    const navigate = useNavigate()

    const handleLogin = async () => {
        // handle login logic here
        try {
            const res = await api.post( "/auth/login", { email, password } );
            console.log( res.data );

            setUser( res.data.user );

            navigate( '/organization' )
        } catch ( error ) {
            console.log( error )
        }
    };

    return (
        <div className="w-full flex items-center justify-center flex-col gap-14 mt-10 ">
            <div className="flex items-center justify-center flex-col">
                <img src="/logo.png" alt="logo" className="h-20 w-20" />
                <p className="text-xl font-bold p-2">
                    Your AI workplace
                </p>
                <p className="text-2xl font-medium text-gray-400">
                    Login to your Motion account
                </p>
            </div>
            <div className="flex justify-center flex-col gap-2  w-80">
                <label className="pb-2 text-gray-800 font-medium">
                    Email
                </label>
                <input
                    type="email"
                    name='email'
                    placeholder='Enter your email address...'
                    className="text-black py-2 px-1 rounded-lg focus:border-blue-600 bg-transparent ml-2"
                    value={ email }
                    onChange={ ( e ) => setEmail( e.target.value ) }
                />
                <label className="pb-2 text-gray-800 font-medium">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    placeholder='Enter your password'
                    className="text-black py-2 px-1 rounded-lg focus:border-blue-600 bg-transparent ml-2"
                    value={ password }
                    onChange={ ( e ) => setPassword( e.target.value ) }

                />
                <button
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    onClick={ handleLogin }
                    disabled={ loading }
                >
                    Login
                </button>
            </div>
            <div className=" mt-2">
                <hr className="mb-2" /> new user?
                <Link to='/register' className="ml-2 font-medium underline">
                    Sign up
                </Link>
            </div>
        </div>
    )
}

export default Login