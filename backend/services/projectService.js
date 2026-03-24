import ProjectMember from "../models/projectMemberModel"
import Task from "../models/taskModel"
import Project from "../models/projectModel"
import { DeleteTasksService } from "./taskService"

// delete one project
export const deleteProjectService = async (userId, projectId) => {
    const projectAdmin = await ProjectMember.findOne({
        project: projectId,
        user: userId,
    })

    if(!projectAdmin || projectAdmin.role !== 'admin'){
        throw new Error('not allowed to delete this project')
    }

    // Delete all tasks associated with the project
    await DeleteTasksService(userId, projectId)

    // Delete the project
    await Project.findOneAndDelete({
        _id: projectId
    })
}

// delete all projects for organization:
export const deleteProjectsService = async (userId, organizationId) => {
    // find all projects for the organization
    const projects = await Project.find({
        organization: organizationId,
    })
    
    // delete each project and its associated tasks
    for (const project of projects) {
        await deleteProjectService(userId, project._id)
    }
}