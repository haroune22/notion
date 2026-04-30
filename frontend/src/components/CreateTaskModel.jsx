import React, { useState } from 'react'
import api from '../api/axios'

const CreateTaskModal = ( {
    project,
    setShowCreateTaskModal,
    members,
    setTasks
} ) => {

    const [ title, setTitle ] = useState( '' )
    const [ description, setDescription ] = useState( '' )
    const [ status, setStatus ] = useState( 'todo' )
    const [ priority, setPriority ] = useState( 'low' )
    const [ assignedTo, setAssignedTo ] = useState( '' )
    const [ dueDate, setDueDate ] = useState( '' )

    const handleCreateTask = async ( e ) => {
        e.preventDefault();
        if ( !assignedTo ) {
            return;
        }
        try {
            const res = await api.post( `/projects/${ project._id }/task`, {
                title,
                description,
                priority,
                assignedTo,
                dueDate
            } );
            setTasks( prev => [ res.data.newTask, ...prev ] );
            // console.log( res.data )
            setShowCreateTaskModal( false );
        } catch ( error ) {
            console.log( error );
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-2">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-2">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Create Task
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Add a new task to { project?.name }
                        </p>
                    </div>

                    <button
                        onClick={ () => setShowCreateTaskModal( false ) }
                        className="text-gray-400 hover:text-gray-600 text-xl transition hover:cursor-pointer"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={ handleCreateTask }
                    className="flex flex-col gap-2 p-4"
                >
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">
                            Task Name
                        </label>

                        <input
                            type="text"
                            placeholder="Design dashboard UI..."
                            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={ title }
                            onChange={ ( e ) => setTitle( e.target.value ) }
                        />

                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            rows={ 3 }
                            placeholder="Describe the task..."
                            className="border border-gray-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={ description }
                            onChange={ ( e ) => setDescription( e.target.value ) }
                        />

                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={ status }
                                onChange={ ( e ) => setStatus( e.target.value ) }
                            >
                                <option>Todo</option>
                                <option>pending</option>
                                <option>done</option>
                                <option>blocked</option>
                            </select>

                        </div> */}

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                Priority
                            </label>
                            <select
                                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={ priority }
                                onChange={ ( e ) => setPriority( e.target.value ) }
                            >
                                <option>low</option>
                                <option>medium</option>
                                <option>high</option>
                            </select>

                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">
                            Assign To
                        </label>
                        <select
                            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={ assignedTo }
                            onChange={ ( e ) => setAssignedTo( e.target.value ) }
                        >
                            <option value="">Select a member</option>

                            { members.map( ( member ) => (
                                <option
                                    key={ member._id }
                                    value={ member.user._id }
                                >
                                    { member.user.name || "Unknown User" }
                                </option>
                            ) ) }
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">
                            Due Date
                        </label>
                        <input
                            type="date"
                            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={ dueDate }
                            onChange={ ( e ) => setDueDate( e.target.value ) }
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={ () => setShowCreateTaskModal( false ) }
                            className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition hover:cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-700 text-white px-5 py-2.5 rounded-xl hover:bg-blue-600 transition shadow-sm hover:cursor-pointer"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTaskModal