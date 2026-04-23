import { useEffect } from "react"
import api from "../api/axios"
import { useState } from "react"
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
            await api.delete( `/organization/${ id }` );
            setData( null );
        } catch ( error ) {
            console.log( error );
        }
    };

    return (
        <div className="px-4 pt-2 flex flex-col items-start gap-10">
            <div>
                <h1 className="text-2xl font-bold">Organizations:</h1>
            </div>
            { !data && (
                <div>
                    <div className="flex items-center justify-center gap-2">
                        <input
                            type="text"
                            placeholder="name your organization.."
                            className="text-black w-md py-2 px-1 rounded-lg focus:border-blue-600 bg-transparent ml-2"
                            onChange={ ( e ) => setName( e.target.value ) }
                            value={ name }
                        />
                        <button
                            onClick={ handleCreateOrg }
                            className="text-white items-center gap-2 px-4 py-2 rounded-lg border bg-gray-900 hover:bg-gray-800 transition hover:cursor-pointer"
                        >
                            create organization
                        </button>
                    </div>
                </div>
            ) }
            { data && (
                <div className="flex flex-col items-start gap-4">
                    <div
                        className="flex items-center justify-between w-96 border border-gray-200 px-4 py-2 rounded-lg hover:shadow-sm transition"
                    >
                        <Link to={ `/${ data._id }/projects` }>
                            <p
                                className="font-medium text-gray-800 hover:underline hover:cursor-pointer"
                            >
                                { data.name }
                            </p>
                        </Link>
                        { isAdmin && (
                            <button
                                onClick={ () => handleDelete( data._id ) }
                                className="text-white items-center gap-2 px-4 py-2 rounded-lg border bg-red-700 hover:bg-red-600 transition hover:cursor-pointer"
                            >
                                Delete
                            </button>
                        ) }
                    </div>
                </div>
            ) }
        </div>
    )
}

export default Organization