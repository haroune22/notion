import React, { useState } from 'react'
import api from '../api/axios'

const TasksList = ( {
    tasks,
    isAdmin,
    setTasks,
    projectId,
    projectMembers,
} ) => {
    const [ editData, setEditData ] = useState( {} )

    const [ editingTaskId, setEditingTaskId ] = useState( null );

    const handleEdit = async ( task ) => {
        setEditingTaskId( task._id )

        setEditData( {
            _id: task._id,
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            assignedTo: task.assignedTo?._id || '',
            dueDate: task.dueDate
                ? new Date( task.dueDate ).toISOString().split( "T" )[ 0 ]
                : ''
        } )
    }

    const handleUpdate = async ( taskId ) => {
        try {
            if ( isAdmin ) {
                const res = await api.put( `/projects/${ projectId }/task/${ taskId }`, editData )

                setTasks( prev => prev.map( t => t._id === taskId ? {
                    ...res.data.updatedTask,
                    assignedTo: res.data.updatedTask.assignedTo
                } : t
                ) )
                setEditingTaskId( null )
            } else {
                const res = await api.put( `/projects/task/${ taskId }/status`, {
                    status: editData.status
                } )
                setTasks( prev => prev.map( t => t._id === taskId ? {
                    ...res.data.updatedTask,
                    assignedTo: res.data.updatedTask.assignedTo
                } : t
                ) )
                setEditingTaskId( null )
            }
        } catch ( error ) {
            console.log( error )
        }
    }

    const handleDelete = async ( taskId ) => {
        try {
            if ( isAdmin ) {
                await api.delete( `/projects/${ projectId }/task/${ taskId }` )
                setTasks( prev => prev.filter( t => t._id !== taskId ) )
                if ( editingTaskId ) {
                    setEditingTaskId( null )
                }
            }
        } catch ( error ) {
            console.log( error )
        }
    }

    return (
        //isaAdmin we display all tasks of the project else we display only the assigned tasks to the user
        <>
            <div className="max-w-7xl mx-auto mt-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Tasks
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            { tasks.length } task{ tasks.length !== 1 && "s" }
                        </p>
                    </div>
                </div>

                { tasks.length === 0 ? (
                    <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-12 text-center">
                        <p className="text-lg font-medium text-gray-700">
                            No tasks found
                        </p>

                        <p className="text-sm text-gray-500 mt-2">
                            { isAdmin
                                ? "Create your first task for this project."
                                : "You currently have no assigned tasks." }
                        </p>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div className="grid grid-cols-8 gap-4 bg-gray-100 px-6 py-4 border-b border-gray-200 text-sm font-semibold text-gray-700">

                            <div className="col-span-2">
                                Title
                            </div>

                            <div>
                                Priority
                            </div>

                            <div>
                                Status
                            </div>

                            <div>
                                Assigned
                            </div>

                            <div>
                                Due Date
                            </div>

                            <div className="col-span-2 text-right">
                                Actions
                            </div>
                        </div>

                        <div className="divide-y divide-gray-200">
                            { tasks.length !== 0 && tasks.map( ( task ) => (
                                <div
                                    key={ task._id }
                                    className="grid grid-cols-8 gap-4 px-6 py-5 items-center hover:bg-gray-50 transition"
                                >

                                    <div className="col-span-2">

                                        <input
                                            type="text"
                                            disabled={ task._id !== editingTaskId || !isAdmin }
                                            value={
                                                task._id === editingTaskId
                                                    ? editData.title || ''
                                                    : task.title
                                            }
                                            className={ `
                                                w-full font-semibold text-gray-900 bg-transparent
                                                border rounded-lg px-2 py-1
                                                ${ task._id === editingTaskId && isAdmin
                                                    ? "border-gray-300"
                                                    : "border-transparent"
                                                }
                                            `}
                                            onChange={ ( e ) =>
                                                setEditData( prev => ( {
                                                    ...prev,
                                                    title: e.target.value
                                                } ) )
                                            }
                                        />

                                        <textarea
                                            disabled={ task._id !== editingTaskId || !isAdmin }
                                            value={
                                                task._id === editingTaskId
                                                    ? editData.description || ''
                                                    : task.description
                                            }
                                            rows={ 2 }
                                            className={ `
                                    w-full mt-2 text-sm text-gray-500 bg-transparent resize-none
                                    border rounded-lg px-2 py-1
                                    ${ task._id === editingTaskId && isAdmin
                                                    ? "border-gray-300"
                                                    : "border-transparent"
                                                }
                                `}
                                            onChange={ ( e ) =>
                                                setEditData( prev => ( {
                                                    ...prev,
                                                    description: e.target.value
                                                } ) )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <select
                                            disabled={ task._id !== editingTaskId || !isAdmin }
                                            value={
                                                task._id === editingTaskId
                                                    ? editData.priority || ''
                                                    : task.priority
                                            }
                                            className={ `
                                    w-full border rounded-lg px-3 py-2 text-sm
                                    ${ task._id === editingTaskId && isAdmin
                                                    ? "border-gray-300 bg-white"
                                                    : "border-transparent bg-transparent"
                                                }
                                `}
                                            onChange={ ( e ) =>
                                                setEditData( prev => ( {
                                                    ...prev,
                                                    priority: e.target.value
                                                } ) )
                                            }
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>

                                    <div>
                                        <select
                                            disabled={ task._id !== editingTaskId }
                                            className={ `
                                    w-full border rounded-lg px-3 py-2 text-sm
                                    ${ task._id === editingTaskId
                                                    ? "border-gray-300 bg-white"
                                                    : "border-transparent bg-transparent"
                                                }
                                `}
                                            value={
                                                task._id === editingTaskId
                                                    ? editData.status || ''
                                                    : task.status
                                            }
                                            onChange={ ( e ) =>
                                                setEditData( prev => ( {
                                                    ...prev,
                                                    status: e.target.value
                                                } ) )
                                            }
                                        >
                                            <option value="todo">Todo</option>
                                            <option value="pending">Pending</option>
                                            <option value="done">Done</option>
                                            <option value="blocked">Blocked</option>
                                        </select>
                                    </div>

                                    <div>

                                        { isAdmin ? (
                                            <select
                                                disabled={ task._id !== editingTaskId }
                                                value={
                                                    task._id === editingTaskId
                                                        ? editData.assignedTo || ''
                                                        : task.assignedTo?._id || ''
                                                }
                                                className={ `
                                        w-full border rounded-lg px-3 py-2 text-sm
                                        ${ task._id === editingTaskId
                                                        ? "border-gray-300 bg-white"
                                                        : "border-transparent bg-transparent"
                                                    }
                                    `}
                                                onChange={ ( e ) =>
                                                    setEditData( prev => ( {
                                                        ...prev,
                                                        assignedTo: e.target.value
                                                    } ) )
                                                }
                                            >
                                                { projectMembers.map( ( member ) => (
                                                    <option
                                                        key={ member.user._id }
                                                        value={ member.user._id }
                                                    >
                                                        { member.user.name }
                                                    </option>
                                                ) ) }
                                            </select>
                                        ) : (
                                            <p className="text-sm text-gray-700">
                                                { task.assignedTo?.name || "Unassigned" }
                                            </p>
                                        ) }
                                    </div>

                                    <div>
                                        <input
                                            type="date"
                                            disabled={ task._id !== editingTaskId || !isAdmin }
                                            value={
                                                task._id === editingTaskId
                                                    ? editData.dueDate || ''
                                                    : (
                                                        task.dueDate
                                                            ? new Date( task.dueDate )
                                                                .toISOString()
                                                                .split( "T" )[ 0 ]
                                                            : ''
                                                    )
                                            }
                                            className={ `
                                    w-full border rounded-lg px-1 py-2 text-sm
                                    ${ task._id === editingTaskId && isAdmin
                                                    ? "border-gray-300 bg-white"
                                                    : "border-transparent bg-transparent"
                                                }
                                `}
                                            onChange={ ( e ) =>
                                                setEditData( prev => ( {
                                                    ...prev,
                                                    dueDate: e.target.value
                                                } ) )
                                            }
                                        />
                                    </div>

                                    <div className="col-span-2 flex items-center justify-end gap-3">
                                        { task._id !== editingTaskId ? (
                                            <>
                                                <button
                                                    onClick={ () => handleEdit( task ) }
                                                    className="px-4 py-2 rounded-xl bg-blue-700 text-white hover:bg-blue-600 transition text-sm font-medium"
                                                >
                                                    Edit
                                                </button>

                                                { isAdmin && (
                                                    <button
                                                        onClick={ () => handleDelete( task._id ) }
                                                        className="px-4 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition text-sm font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                ) }
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={ () => handleUpdate( task._id ) }
                                                    className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-500 transition text-sm font-medium"
                                                >
                                                    Save
                                                </button>

                                                <button
                                                    onClick={ () => setEditingTaskId( null ) }
                                                    className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition text-sm font-medium"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) }
                                    </div>
                                </div>
                            ) ) }
                        </div>
                    </div>
                ) }
            </div>
        </>
    )
}

export default TasksList