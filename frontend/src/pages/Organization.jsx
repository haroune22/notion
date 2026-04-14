import React from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Organization = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        const res = await api.post( '/auth/logout' )
        console.log( res.data )
        setUser( null );
        navigate( '/' )
    };

    return (
        <div>
            organization
            { user &&
                <button
                    onClick={ logout }
                    className='p-2 bg-red-600 rounded-md'>
                    logout for now
                </button>
            }
        </div>
    )
}

export default Organization