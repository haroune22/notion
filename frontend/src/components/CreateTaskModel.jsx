import React from 'react'

const CreateTaskModal = ( { project, setShowCreateTaskModal } ) => {

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
                <form className="flex flex-col gap-2 p-4">

                    {/* Task Name */ }
                    <div className="flex flex-col gap-2">

                        <label className="text-sm font-medium text-gray-700">
                            Task Name
                        </label>

                        <input
                            type="text"
                            placeholder="Design dashboard UI..."
                            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* Description */ }
                    <div className="flex flex-col gap-2">

                        <label className="text-sm font-medium text-gray-700">
                            Description
                        </label>

                        <textarea
                            rows={ 3 }
                            placeholder="Describe the task..."
                            className="border border-gray-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* Status + Priority */ }
                    <div className="grid grid-cols-2 gap-4">

                        <div className="flex flex-col gap-2">

                            <label className="text-sm font-medium text-gray-700">
                                Status
                            </label>

                            <select
                                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option>Todo</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>

                        </div>

                        <div className="flex flex-col gap-2">

                            <label className="text-sm font-medium text-gray-700">
                                Priority
                            </label>

                            <select
                                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>

                        </div>

                    </div>

                    {/* Assigned Member */ }
                    <div className="flex flex-col gap-2">

                        <label className="text-sm font-medium text-gray-700">
                            Assign To
                        </label>

                        <select
                            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Select member</option>
                        </select>

                    </div>

                    {/* Due Date */ }
                    <div className="flex flex-col gap-2">

                        <label className="text-sm font-medium text-gray-700">
                            Due Date
                        </label>

                        <input
                            type="date"
                            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* Buttons */ }
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