import ProjectMember from "../models/projectMemberModel.js"
import OrganizationMember from "../models/organizationMemberModel.js"
import Project from "../models/projectModel.js"
import { DeleteTasksService } from "./taskService.js"

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
    await DeleteTasksService(projectId)

    await ProjectMember.deleteMany({
        project: projectId,
    })

    // Delete the project
    await Project.findByIdAndDelete(projectId)
}

// delete all projects for organization:
export const deleteProjectsService = async (userId, organizationId) => {

    const orgAdmin = await OrganizationMember.findOne({
        organization: organizationId,
        user: userId,
    })

    if(!orgAdmin || orgAdmin.role !== 'manager'){
        throw new Error('not allowed to delete projects of this organization')
    }

    // find all projects for the organization
    const projects = await Project.find({
        organization: organizationId,
    })

    // delete each project and its associated tasks
    await Promise.all(
        projects.map(p => deleteProjectService(userId, p._id))
    );
}