import OrganizationMember from "../models/organizationMemberModel.js"
import { deleteProjectsService } from "./projectService.js"
import Organization from "../models/organizationModel.js"

export const DeleteOrgService = async (userId, organizationId) => {
    const orgAdmin = await OrganizationMember.findOne({
        organization: organizationId,
        user: userId,
    });

    if(!orgAdmin || orgAdmin.role !== 'manager'){
        throw new Error('not allowed to delete this organization')
    };

    await deleteProjectsService(userId, organizationId);

    await OrganizationMember.deleteMany({
        organization: organizationId,
    });

    await Organization.findOneAndDelete({   
        _id: organizationId,
    });

}