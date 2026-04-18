import { useEffect } from "react"
import api from "../api/axios"
import { useState } from "react"


const Organization = () => {
    const [ data, setData ] = useState( [] )
    const [ name, setName ] = useState( '' )

    useEffect( () => {
        const getOrg = async () => {
            try {
                const res = await api.get( '/organization' )
                setData( res.data.org )
            } catch ( error ) {
                console.log( error )
            }
        }
        getOrg()
    }, [] )

    const handleCreateOrg = async () => {
        if ( name.length < 2 ) return;
        try {
            const res = await api.post( '/organization', { name } )
            setData( [ ...data, res.data.newOrg ] )
            setName( '' )
        } catch ( error ) {
            console.log( error )
        }
    }

    const handleDelete = async ( id ) => {
        try {
            await api.delete( `/organization/${ id }` );
            setData( ( prev ) => prev.filter( ( org ) => org._id !== id ) );
        } catch ( error ) {
            console.log( error );
        }
    };

    return (
        <div className="px-4 pt-2 flex flex-col items-start gap-10">
            <div>
                <h1 className="text-2xl font-bold">Organizations:</h1>
            </div>
            <div className="flex flex-col items-start gap-4">
                { data.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10">
                        <p className="text-gray-500 mb-4">No organizations found</p>
                    </div>
                ) }
                { data.map( ( org ) => (
                    <div
                        key={ org._id }
                        className="flex items-center justify-center gap-6"
                    >
                        <p className="font-medium text-gray-800 hover:underline hover:cursor-pointer">
                            { org.name }
                        </p>

                        <button
                            onClick={ () => handleDelete( org._id ) }
                            className="text-white items-center gap-2 px-4 py-2 rounded-lg border bg-red-700 hover:bg-red-600 transition hover:cursor-pointer"
                        >
                            Delete
                        </button>
                    </div>
                ) ) }
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
            </div>
        </div>
    )
}

export default Organization