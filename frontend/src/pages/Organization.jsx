import { useEffect, useState } from "react"
import api from "../api/axios"
import { Link } from "react-router-dom"

const Organization = () => {

    const [ data, setData ] = useState( null )
    const [ name, setName ] = useState( '' )
    const [ isAdmin, setIsAdmin ] = useState( false )

    useEffect( () => {
        const getOrg = async () => {
            try {
                const res = await api.get( '/organization' )
                setIsAdmin( res.data.isAdmin )
                setData( res.data.org )
            } catch ( error ) {
                console.log( error )
            }
        }
        getOrg()
    }, [] )

    const handleCreateOrg = async () => {
        if ( !name.trim() ) return

        try {
            const res = await api.post( '/organization', { name } )
            setData( res.data.newOrg )
            setIsAdmin( true )
            setName( '' )
        } catch ( error ) {
            console.log( error )
        }
    }

    const handleDelete = async ( id ) => {
        try {
            await api.delete( `/organization/${ id }` )
            setData( null )
            setIsAdmin( false )
        } catch ( error ) {
            console.log( error )
        }
    }

    const LeaveOrg = async ( id ) => {
        try {
            const res = await api.delete( `/organization/${ id }/leave` )
            console.log( res.data )
            setData( null )
        } catch ( error ) {
            console.log( error )
        }
    }

    return (
        <div className="px-4 pt-2 flex flex-col items-start gap-6">

            <h1 className="text-2xl font-bold">Organizations</h1>
            { data && (
                <div className="w-full max-w-md bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm px-4 py-3 rounded-lg">
                    ⚠️ You can only create a new organization after leaving your current one.
                </div>
            ) }

            { !data && (
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="name your organization..."
                        className="text-black w-md py-2 px-2 rounded-lg border border-gray-300 focus:border-blue-600"
                        value={ name }
                        onChange={ ( e ) => setName( e.target.value ) }
                    />

                    <button
                        onClick={ handleCreateOrg }
                        className="text-white px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition"
                    >
                        Create
                    </button>
                </div>
            ) }
            { data && (
                <div className="flex flex-col gap-4">

                    <div className="flex items-center justify-between w-96 border border-gray-200 px-4 py-3 rounded-lg hover:shadow-sm transition bg-white">

                        <Link to={ `/${ data._id }/projects` }>
                            <p className="font-medium text-gray-800 hover:underline">
                                { data.name }
                            </p>
                        </Link>
                        { isAdmin ? (
                            <button
                                onClick={ () => handleDelete( data._id ) }
                                className="text-white px-4 py-2 rounded-lg hover:cursor-pointer bg-red-700 hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        ) : (
                            <button
                                onClick={ () => LeaveOrg( data._id ) }
                                className="text-white px-4 py-2 rounded-lg hover:cursor-pointer bg-red-700 hover:bg-red-600 transition"
                            >
                                Leave
                            </button>
                        ) }

                    </div>

                </div>
            ) }

        </div>
    )
}

export default Organization