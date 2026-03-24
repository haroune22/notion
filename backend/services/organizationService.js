import OrganizationMember from "../models/organizationMemberModel"
import { deleteProjectsService } from "./projectService"
import Organization from "../models/organizationModel"

export const DeleteOrgService = async (userId, organizationId) => {
    const orgAdmin = await OrganizationMember.findOne({
        organization: organizationId,
        user: userId,
    })

    if(!orgAdmin || orgAdmin.role !== 'manager'){
        throw new Error('not allowed to delete this organization')
    }

    await deleteProjectsService(userId, organizationId)

    await OrganizationMember.deleteMany({
        organization: organizationId,
    })

    await Organization.findOneAndDelete({   
        _id: organizationId,
    })

}