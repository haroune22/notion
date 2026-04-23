import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { useNavigate, useParams } from 'react-router-dom'

const Invite = () => {

    const [ invite, setInvite ] = useState( null )
    const [ loading, setLoading ] = useState( true )

    const { token } = useParams()
    const navigate = useNavigate()

    useEffect( () => {
        const getInvite = async () => {
            try {
                const res = await api.get( `/invite/${ token }` )
                setInvite( res.data.invitation )
            } catch ( err ) {
                console.log( err )
            } finally {
                setLoading( false )
            }
        }

        if ( token ) getInvite()
    }, [ token ] )

    const handleAccept = async () => {
        try {
            await api.post( `/invite/${ token }/accept` )
            navigate( `/organization` )
        } catch ( err ) {
            console.log( err )
        }
    }

    const handleDecline = async () => {
        try {
            await api.post( `/invite/${ token }/decline` )
            navigate( `/organization` )
        } catch ( err ) {
            console.log( err )
        }
    }

    if ( loading ) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading invitation...</p>
            </div>
        )
    }

    if ( !invite ) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">Invalid or expired invitation</p>
            </div>
        )
    }

    const isExpired = new Date( invite.expiresAt ) < new Date()

    return (
        <div className="min-h-screen flex justify-center mt-20 bg-gray-50 px-4">

            <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    You're Invited 🎉
                </h1>
                <p className="text-gray-500 text-sm mb-6">
                    Someone invited you to join an organization
                </p>
                <div className="space-y-3 text-sm">

                    <div className="flex justify-between">
                        <span className="text-gray-500">Email</span>
                        <span className="text-gray-900">{ invite.email }</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Status</span>
                        <span className={ `px-2 py-1 rounded-full text-xs font-medium ${ invite.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-600"
                            }` }>
                            { invite.status }
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Expires</span>
                        <span className="text-gray-900">
                            { new Date( invite.expiresAt ).toLocaleDateString() }
                        </span>
                    </div>
                    { isExpired && (
                        <p className="text-red-500 text-xs mt-2">
                            This invitation has expired
                        </p>
                    ) }
                </div>
                { !isExpired && invite.status === "pending" && (
                    <div className="flex gap-3 mt-6">

                        <button
                            onClick={ handleDecline }
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 hover:cursor-pointer transition"
                        >
                            Decline
                        </button>

                        <button
                            onClick={ handleAccept }
                            className="flex-1 px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-600 hover:cursor-pointer transition"
                        >
                            Accept Invite
                        </button>

                    </div>
                ) }

            </div>
        </div>
    )
}

export default Invite