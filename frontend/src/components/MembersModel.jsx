import React from 'react'
import api from '../api/axios'

const MembersModal = ( {
    project,
    setShowMembersModal,
    members,
    setMembers
} ) => {

    const handleRemove = async ( email ) => {
        try {
            api.delete( `/projects/${ project._id }/removeMember`, {
                data: { email }
            } )
            setMembers( prev =>
                prev.map( m =>
                    m.user.email === email ? { ...m, isAssigned: false } : m
                )
            )
        } catch ( error ) {
            console.log( error )
        }
    }

    const handleAssign = async ( email ) => {
        try {
            api.post( `/projects/${ project._id }/addMember`, { email } )
            setMembers( prev =>
                prev.map( m =>
                    m.user.email === email ? { ...m, isAssigned: true } : m
                )
            )
        } catch ( error ) {
            console.log( error )
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Project Members
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage members for { project?.name }
                        </p>
                    </div>
                    <button
                        onClick={ () => setShowMembersModal( false ) }
                        className="text-gray-400 hover:text-gray-600 text-2xl transition hover:cursor-pointer"
                    >
                        ×
                    </button>
                </div>

                <div className="max-h-125 overflow-y-auto p-6 flex flex-col gap-4">
                    { members?.length > 0 ? (
                        members.map( ( member ) => {
                            // fake check for now
                            return (
                                <div
                                    key={ member._id }
                                    className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-4 hover:shadow-sm transition"
                                >
                                    <div className="flex flex-col">

                                        <h3 className="font-medium text-gray-900">
                                            { member.user.name || "Unknown User" }
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            { member.user.email }
                                        </p>

                                    </div>
                                    { member.isAssigned ? (

                                        <button
                                            className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition text-sm font-medium hover:cursor-pointer"
                                            onClick={ () => handleRemove( member.user.email ) }
                                        >
                                            Remove
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium hover:cursor-pointer"
                                            onClick={ () => handleAssign( member.user.email ) }
                                        >
                                            Assign
                                        </button>
                                    ) }
                                </div>
                            )
                        } )
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-500">
                                No organization members found.
                            </p>
                        </div>
                    ) }
                </div>

                <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
                    <button
                        onClick={ () => setShowMembersModal( false ) }
                        className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition hover:cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MembersModal