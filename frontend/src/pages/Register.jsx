import React, { useState } from 'react'
import api from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const { setUser, loading } = useAuth();

    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ name, setName ] = useState( "" );

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const res = await api.post( "/auth/register", { email, password, name } );
            console.log( res.data );

            setUser( res.data.user );

            navigate( "/organization" );
        } catch ( error ) {
            console.log( error )
        }
    };
    return (
        <div className="w-full h-full flex items-center justify-center flex-col gap-10 mt-10 ">
            <div className="flex items-center justify-center flex-col">
                <img src="/logo.png" alt="logo" className="h-20 w-20" />
                <p className="text-xl font-bold p-2">
                    Your AI workplace
                </p>
                <p className="text-2xl font-medium text-gray-400">
                    create your Motion account
                </p>
            </div>
            <div className="flex justify-center flex-col gap-2  w-80">
                <label className="pb-2 text-gray-800 font-medium">
                    Name
                </label>
                <input
                    type="text"
                    name='name'
                    placeholder='Enter your name...'
                    className="border border-gray-300 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={ name }
                    onChange={ ( e ) => setName( e.target.value ) }
                />
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
                    className="w-full flex items-center justify-center bg-blue-700 py-2 text-white font-medium mt-6 hover:bg-blue-600 hover:cursor-pointer rounded-md"
                    onClick={ handleRegister }
                    disabled={ loading }
                >
                    Register
                </button>
            </div>
            <div className="my-4">
                <hr className="mb-2" /> new user?
                <Link to='/' className="ml-2 font-medium underline">
                    Sign in
                </Link>
            </div>
        </div>
    )
}

export default Register