
import ProjectMember from "../models/projectMemberModel"
import Task from "../models/taskModel"


export const DeleteTaskService = async (userId, projectId, taskId) => {
    const projectAdmin = await ProjectMember.findOne({
        project: projectId,
        user: userId,
    })

    if(!projectAdmin || projectAdmin.role !== 'admin'){
        throw new Error('not a allowed to delete task on this project')
    }

    await Task.findOneAndDelete({
        _id: taskId,
        project: projectId
    })

}

// we user this when we delete project or organization.
// when delete tasks for organization we simply call this function for every project inside the organization:
export const DeleteTasksService = async (projectId) => {

    await Task.deleteMany({
        project: projectId,
    })
}
