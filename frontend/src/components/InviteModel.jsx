import React, { useState } from 'react'
import api from '../api/axios'

export const InviteModel = ( { setShowInviteModel, orgId } ) => {

    const [ email, setEmail ] = useState( '' )
    const [ loading, setLoading ] = useState( false )

    const handleInvite = async ( e ) => {
        e.preventDefault()
        if ( !email ) return

        try {
            setLoading( true )
            const res = await api.post( `/organization/${ orgId }/invites`, { email } )
            console.log( res.data )
            setEmail( '' )
            setShowInviteModel( false )
        } catch ( error ) {
            console.log( error )
        } finally {
            setLoading( false )
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Invite Member
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                    Enter the email of the person you want to invite
                </p>
                <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={ email }
                    onChange={ ( e ) => setEmail( e.target.value ) }
                />
                <div className="flex justify-end gap-3">
                    <button
                        onClick={ () => setShowInviteModel( false ) }
                        className="px-4 py-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer hover:underline"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={ handleInvite }
                        disabled={ loading }
                        className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 hover:cursor-pointer"
                    >
                        { loading ? "Sending..." : "Send Invite" }
                    </button>
                </div>
            </div>
        </div>
    )
}