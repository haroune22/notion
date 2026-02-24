import project from "../models/projectModel.js";
import projectMember from "../models/projectMemberModel.js";
import organizationMember from "../models";

export const CreateProject = async (req, res) => {
  const userId = req.user._id;
  const orgId = req.params.id;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "project name is required" });
  }

  try {
    const org = await organizationMember.findOne({
      user: userId,
      organization: orgId,
      role: "manager",
    });

    if (!org) {
      return res
        .status(403)
        .json({ message: "user is not a manager of any organization" });
    }

    const newProject = await project.create({
      name,
      ownerId: userId,
      organization: orgId,
      createdBy: userId,
    });

    if (newProject) {
      await projectMember.create({
        project: newProject._id,
        role: "admin",
        user: userId,
      });
    }

    return res.status(200).json({ message: "project created", newProject });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating project", error: error.message });
    console.log(error);
  }
};

export const deleteProject = async (req, res) => {
  const userId = req.user._id;
  const projectId = req.params.id;

  try {
    const proj = await project.findById(projectId);

    if (!proj) {
      return res.status(404).json({ message: "Project not found" });
    }

    // check if the user is admin of project
    const orgMembership = await organizationMember.findOne({
      user: userId,
      organization: proj.organization,
      role: "manager",
    });

    if (!orgMembership) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // todo: delete all members related to this project with their tasks

    await project.findByIdAndDelete(projectId);

    return res.status(200).json({ message: "project deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting project", error: error.message });
    console.log(error);
  }
};

export const getProjects = async (req, res) => {
  const userId = req.user._id;
  const orgId = req.params.orgId;

  try {
    const orgMembership = await organizationMember.findOne({
      user: userId,
      organization: orgId,
      role: "manager",
    });

    if (!orgMembership) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const projects = await project.find({
      organization: orgId,
    });

    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }

    return res.status(200).json({ message: "projects retrieved", projects });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving projects", error: error.message });
  }
};

export const getProject = async (req, res) => {
  const userId = req.user._id;

  try {
    const memberships = await projectMember.find({
      user: userId,
    });

    const projects = await project.find({
      _id: { $in: memberships.map((pm) => pm.project) },
    });

    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({ message: "Projects retrieved", projects });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving projects", error: error.message });
  }
};
