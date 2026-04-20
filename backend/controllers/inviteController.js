import invite from '../models/inviteModel.js'
import User from '../models/userModel.js';
import OrganizationMember from '../models/organizationMemberModel.js';

export const inviteAccept = async (req, res) => {
    const userId = req.user._id;
    const token = req.params.token

    try {
        const invitation = await invite.findOne({
            token,
        })
    
        if (!invitation || invitation.expiresAt < new Date()) {
            return res.status(404).json({ message: "Invitation not found or expired" });
        }

        if (invitation.status !== "pending") {
            return res.status(400).json({ message: "Invitation already used" });
        }

    
        const user = await User.findOne({
            email: invitation.email,
        })
    
        if (!user || user._id.toString() !== userId.toString()){
            return res.status(403).json({message : 'you are not authorized'})
        }

        const existingMember = await OrganizationMember.findOne({
            organization: invitation.organization,
            user: userId,
        });

        if (existingMember) {
            return res.status(400).json({ message: "Already a member" });
        }

        // add user to organization
        const newOrgMember = await OrganizationMember.create({
            user: userId,
            organization:invitation.organization,
            role: 'member',
        })
        
        await invite.findByIdAndUpdate(invitation._id, {
            status: 'accepted',
        })
    
        res.status(200).json({ message: 'invitation accepted', newOrgMember})
        
    } catch (error) {
        res.status(500).json({ message: "Error creating project", error: error.message });
        console.log(error);
    }
}


export const inviteRefuse = async (req, res) => {
    const userId = req.user._id;
    const token = req.params.token

    try {
        const invitation = await invite.findOne({
            token,
        })
    
        if (!invitation || invitation.expiresAt < new Date()) {
            return res.status(404).json({ message: "Invitation not found or expired" });
        }

        if (invitation.status !== "pending") {
            return res.status(400).json({ message: "Invitation already used" });
        }

        const user = await User.findOne({
            email: invitation.email,
        })
    
        if (!user || user._id.toString() !== userId.toString()){
            return res.status(403).json({message : 'you are not authorized'})
        }

        const existingMember = await OrganizationMember.findOne({
            organization: invitation.organization,
            user: userId,
        });

        if (existingMember) {
            return res.status(400).json({ message: "Already a member" });
        }
        
        invitation.status = "declined";
        
        await invitation.save();
    
        res.status(200).json({ message: 'invitation declined'})
        
    } catch (error) {
        res.status(500).json({ message: "Error creating project", error: error.message });
        console.log(error);
    }
}

export const getInviteDetails = async (req, res) => {
    const userId = req.user._id;
    const token = req.params.token

    try {
        const invitation = await invite.findOne({
            token,
        })
    
        if (!invitation || invitation.expiresAt < new Date()) {
            return res.status(404).json({ message: "Invitation not found or expired" });
        }

        if (invitation.status !== "pending") {
            return res.status(400).json({ message: "Invitation already used" });
        }

        const user = await User.findOne({
            email: invitation.email,
        })
    
        if (!user || user._id.toString() !== userId.toString()){
            return res.status(403).json({message : 'you are not authorized'})
        }

        const existingMember = await OrganizationMember.findOne({
            organization: invitation.organization,
            user: userId,
        });

        if (existingMember) {
            return res.status(400).json({ message: "Already a member" });
        }
        
        return res.status(200).json({ message: 'invitation details', invitation    })
        
    } catch (error) {
        res.status(500).json({ message: "Error creating project", error: error.message });
        console.log(error);
    }
}