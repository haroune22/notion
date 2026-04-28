import React from 'react'

const CreateTaskModel = ( { projectId, setShowCreateTaskModel } ) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
                create
                <button
                    className='bg-blue-400 rounded-2xl p-4'
                    onClick={ () => setShowCreateTaskModel( false ) }
                >
                    stop
                </button>
            </div>
        </div >
    )
}

export default CreateTaskModel