import { useState } from "react";
import { Link } from "react-router-dom"

const Login = () => {
    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );

    const handleLogin = () => {

    };

    return (
        <div className="w-full flex items-center justify-center flex-col gap-14 mt-10 ">
            <div className="flex items-center justify-center flex-col">
                <img src="/logo.png" alt="logo" className="h-20 w-20" />
                <p className="text-xl font-bold p-2">
                    Your AI workplace
                </p>
                <p className="text-2xl font-medium text-gray-400">
                    Login yo your Motion account
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
                <button className="w-full flex items-center justify-center bg-blue-700 py-2 text-white font-medium mt-6 hover:bg-blue-600 hover:cursor-pointer rounded-md">
                    Login
                </button>
            </div>
            <div className=" mt-2">
                <hr className="mb-2" /> new user?
                <Link className="ml-2 font-medium underline">
                    Sign up
                </Link>
            </div>
        </div>
    )
}

export default Login