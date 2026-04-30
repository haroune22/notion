import React, { useEffect, useState } from 'react'
import api from '../api/axios';
import { useParams } from 'react-router-dom';
import MembersModal from '../components/MembersModel';
import CreateTaskModal from '../components/CreateTaskModel';


const Tasks = () => {
    const [ tasks, setTasks ] = useState( [] );
    const [ project, setProject ] = useState( null );
    const [ isAdmin, setIsAdmin ] = useState( false );
    const [ orgMembers, setOrgMembers ] = useState( [] );
    const [ projectMembers, setProjectMembers ] = useState( [] );

    const [ showCreateTaskModal, setShowCreateTaskModal ] = useState( false )
    const [ showMembersModal, setShowMembersModal ] = useState( false )

    const { projectId } = useParams();

    useEffect( () => {
        const getProjectAndTasks = async () => {
            try {
                const projectRes = await api.get( `/projects/${ projectId }` );
                setProject( projectRes.data.project );
                // console.log( projectRes.data.project )

                const admin = projectRes.data.isAdmin;
                setIsAdmin( admin );

                if ( admin ) {
                    const tasksRes = await api.get( `/projects/${ projectId }/tasks` );
                    setTasks( tasksRes.data.tasks );
                } else {
                    const tasksRes = await api.get( '/tasks' );
                    setTasks( tasksRes.data.tasks );
                }

            } catch ( error ) {
                console.log( error );
            }
        };

        getProjectAndTasks();

    }, [ projectId ] );

    const handleMemberModal = async () => {
        try {
            const OrgRes = await api.get( `/organization/${ project.organization }/members` )
            setOrgMembers( OrgRes.data.orgMembers );

            const ProjectRes = await api.get( `/projects/${ projectId }/members` )
            setProjectMembers( ProjectRes.data.projectMembers );

            //extract project members ids
            const projectIds = new Set( ProjectRes.data.projectMembers.map( m => m.user._id ) );
            //format members to include isAssigned field
            const formatMembers = OrgRes.data.orgMembers.map( m => ( {
                ...m,
                isAssigned: projectIds.has( m.user._id )
            } ) );
            setOrgMembers( formatMembers );
            // console.log( orgMembers )

            setShowMembersModal( true );
        } catch ( error ) {
            console.log( error )
        }
    }

    const handleCreateTask = async () => {
        try {
            const res = await api.get( `/projects/${ projectId }/members` )
            setProjectMembers( res.data.projectMembers );
            setShowCreateTaskModal( true );
        } catch ( error ) {
            console.log( error )
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 px-6 py-8">

                <div className="max-w-5xl mx-auto">
                    <div className="flex items-start justify-between mb-8">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                { project?.name }
                            </h1>

                            <p className="text-gray-500 text-sm mt-1">
                                Manage tasks and project members
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            { isAdmin && (
                                <>
                                    <button
                                        onClick={ handleMemberModal }
                                        className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                                    >
                                        Members
                                    </button>
                                    <button
                                        onClick={ handleCreateTask }
                                        className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition shadow-sm"
                                    >
                                        Create Task
                                    </button>
                                </>
                            ) }
                        </div>
                    </div>

                    { !isAdmin && (
                        <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm px-4 py-3 rounded-xl">
                            ⚠️ Only admins can create and manage tasks in this project.
                        </div>
                    ) }

                    { project && (
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                                        Current Project
                                    </p>

                                    <h2 className="text-xl font-semibold text-gray-900">
                                        { project.name }
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Organize tasks, collaborate with members, and track progress.
                                    </p>
                                </div>

                                { isAdmin && (
                                    <button
                                        onClick={ () => { } }
                                        className="text-red-500 hover:text-red-600 text-sm font-medium hover:underline"
                                    >
                                        Delete Project
                                    </button>
                                ) }

                            </div>
                        </div>
                    ) }

                    <div>
                        <div className="flex items-center justify-between mb-4">

                            <h2 className="text-xl font-semibold text-gray-900">
                                Tasks
                            </h2>

                            <p className="text-sm text-gray-500">
                                { tasks.length } task{ tasks.length !== 1 && 's' }
                            </p>

                        </div>

                        { tasks.length === 0 ? (
                            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">

                                <p className="text-gray-500 mb-2">
                                    No tasks yet
                                </p>

                                <p className="text-sm text-gray-400">
                                    { isAdmin
                                        ? 'Create your first task to get started.'
                                        : 'You currently have no assigned tasks.' }
                                </p>

                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">



                            </div>
                        ) }
                    </div>
                </div>
            </div>
            { showCreateTaskModal && (
                <CreateTaskModal
                    project={ project }
                    setShowCreateTaskModal={ setShowCreateTaskModal }
                    members={ projectMembers }
                    setTasks={ setTasks }
                />
            ) }
            { showMembersModal && (
                <MembersModal
                    members={ orgMembers }
                    project={ project }
                    setShowMembersModal={ setShowMembersModal }
                    setMembers={ setOrgMembers }
                />
            ) }
        </>
    )
}

export default Tasks