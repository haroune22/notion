import organization from "../models/organizationModel.js";
import organizationMember from "../models/organizationMember.js";

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
      const orgMember = await organizationMember.create({
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
  const orgId = req.params.id;

  try {
    const org = await organization.findById(orgId);

    if (!org) {
      return res.status(404).json({ message: "organization not found" });
    }

    // check if the user is manager of org
    const membership = await organizationMember.findOne({
      organization: org._id,
      user: userId,
    });

    if (!membership || membership.role !== "manager") {
      return res.status(403).json({ message: "not authorized to delete org" });
    }

    await organization.findByIdAndDelete(org._id);

    return res.status(200).json({ message: "organization deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting organization", error: error.message });
    console.log(error);
  }
};
    