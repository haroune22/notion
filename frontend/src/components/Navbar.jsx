import React from 'react'
import { useAuth } from '../context/AuthContext'

export const Navbar = () => {
    const { user } = useAuth();

    return (
        <div className='flex items-center justify-between w-full h-20 border-b border-gray-300 px-4'>
            <div className='ml-4 flex items-center justify-center gap-4'>
                <h3 className='text-lg text-blue-800'>
                    Motion
                </h3>
                <img src="/logo.png" alt="logo" width={ 60 } height={ 60 } />
            </div>
            <div className='flex items-center justify-center gap-2'>
                { user ?
                    <div className='flex items-center justify-center gap-4'>
                        <p className='underline text-lg font-medium '>
                            { user.name }
                        </p>
                        <button className='text-white text-md bg-blue-700 rounded-lg px-4 py-2 hover:cursor-pointer hover:bg-blue-600'>
                            Logout
                        </button>
                    </div>
                    :
                    <div className='flex items-center justify-center gap-4'>
                        <button className='text-white text-md bg-blue-700 rounded-lg px-4 py-2 hover:cursor-pointer hover:bg-blue-600'>
                            Login
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
