import { useEffect, useState } from "react"
import api from '../api/axios'
import { useParams } from "react-router-dom"


const Projects = () => {
    const [ data, setData ] = useState( [] )
    const [ orgName, setOrgName ] = useState( '' )
    const [ name, setName ] = useState( '' )
    const { orgId } = useParams()

    useEffect( () => {
        const getProjects = async () => {
            const res = await api.get( `/organization/${ orgId }/projects` );
            console.log( res.data.projects );
            setData( res.data.projects );
        };

        const getOrg = async () => {
            const res = await api.get( `/organization/me/${ orgId }` );
            console.log( res.data.org );
            setOrgName( res.data.name );
        };

        getProjects();
        getOrg();
    }, [ orgId ] );

    const handleDelete = async ( id ) => {
        try {
            await api.delete( `/projects/${ id }` );
            setData( prev => prev.filter( p => p._id !== id ) );
        } catch ( err ) {
            console.log( err );
        }
    };

    const handleCreateProject = async () => {
        if ( name.length < 2 ) return;;
        try {
            const res = await api.post( `/organization/${ orgId }/projects`, { name } );
            setData( prev => [ ...prev, res.data.newProject ] );
            setName( '' );
        } catch ( err ) {
            console.log( err );
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-8">
            <div className="max-w-4xl mx-auto flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        { orgName }
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage your projects
                    </p>
                </div>

                <button className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition shadow-sm">
                    Invite Members
                </button>
            </div>
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm mb-6">
                <input
                    type="text"
                    placeholder="New project name..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={ name }
                    onChange={ ( e ) => setName( e.target.value ) }
                />
                <button
                    onClick={ handleCreateProject }
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Create
                </button>
            </div>
            <div className="max-w-4xl mx-auto flex flex-col gap-4">
                { data.length > 0 ? (
                    data.map( ( project ) => (
                        <div
                            key={ project._id }
                            className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between hover:shadow-md transition"
                        >
                            {/* Left */ }
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    { project.name }
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    { project.description || "No description" }
                                </p>
                            </div>

                            {/* Right */ }
                            <button
                                onClick={ () => handleDelete( project._id ) }
                                className="text-red-500 text-sm hover:text-red-600 font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    ) )
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        No projects yet. Create your first one 🚀
                    </div>
                ) }
            </div>
        </div>
    )
}

export default Projects