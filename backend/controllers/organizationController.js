import organization from "../models/organizationModel.js";
import organizationMember from "../models/organizationMemberModel.js";
import invite from "../models/inviteModel.js";
import crypto from "crypto";
import User from "../models/userModel.js";
import { DeleteOrgService } from "../services/organizationService.js";


export const CreateOrganization = async (req, res) => {
  const userId = req.user._id;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Organization name is required" });
  }

  try {
    const newOrg = await organization.create({
      name,
      ownerId: userId,
    });

    if (newOrg) {
      await organizationMember.create({
        organization: newOrg._id,
        role: "manager",
        user: userId,
      });
    }

    return res.status(200).json({ message: "organization created", newOrg });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating organization", error: error.message });
    console.log(error);
  }
};

export const deleteOrganization = async (req, res) => {
  const userId = req.user._id;
  const orgId = req.params.orgId;

  try {
    const org = await organization.findById(orgId);

    if (!org) {
      return res.status(404).json({ message: "organization not found" });
    }

    await DeleteOrgService(userId, orgId);

    return res.status(200).json({ message: "organization deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting organization", error: error.message });
    console.log(error);
  }
};

export const getOrganization = async (req, res) => {
  const userId = req.user._id;

  try {
    const org = await organization.find({
      ownerId: userId,
    });
    
    if (!org) {
      return res.status(404).json({ message: "organization not found" });
    }

    return res.status(200).json({ message: "organization retrieved", org });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting organization", error: error.message });
    console.log(error);
  }
};

export const getMyOrg = async (req, res) => {

  const userId = req.user._id
  const orgId = req.params.id

  try {
    if(!orgId) {
      return res.status(400).json({ message: "Organization ID is required" });
    }

    const org = await organization.findById(orgId)

    return res.status(200).json(org)
  } catch (error) {
    res.status(500).json({ message: "Error creating invitation", error: error.message });
    console.log(error);
  }
}

export const CreateInvitation = async (req, res) => {

  const userId = req.user._id;
  const orgId = req.params.orgId;
  const { email } = req.body

  if(!email){
    return res.status(400).json({ message: 'email required '})
  }

  if(!orgId) {
    return res.status(400).json({ message: "Organization ID is required" });
  }

  try {
    const orgManager = await organizationMember.findOne({
      organization: orgId,
      user: userId,
    })

    // console.log(orgManager);

    if(!orgManager || orgManager.role !== 'manager'){
      return res.status(403).json({ message: 'not authorized to send invites'})
    }

    const existingInvite = await invite.findOne({
      email,
      organization: orgId,
      status: "pending",
    });

    if (existingInvite) {
      return res.status(400).json({ message: "User already invited" });
    }

    const user = await User.findOne({ email });

    if (user) {
      const isMember = await organizationMember.findOne({
        organization: orgId,
        user: user._id,
      });

      if (isMember) {
        return res.status(400).json({ message: "User already in organization" });
      }
    }
    // token is the invite link:
    const token = crypto.randomBytes(32).toString("hex");

    //create invite in db
    await invite.create({
      email,
      token,
      organization: orgId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })

    //sending email with link
    // const inviteLink = `${process.env.FRONTEND_URL}/accept-invite?token=${token}`;
    return res.json({ inviteLink: `http://localhost:5173/invite/${token}` })
  } catch (error) {
    res.status(500).json({ message: "Error creating invitation", error: error.message });
    console.log(error);
  }
}