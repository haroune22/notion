import project from "../models/projectModel.js";
import projectMember from "../models/projectMemberModel.js";
import organizationMember from "../models/organizationMemberModel.js";
import Organization from "../models/organizationModel.js";
import Project from "../models/projectModel.js";
import User from "../models/userModel.js";

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

export const getProjectMembers = async (req, res) => {

  const userId = req.user._id
  const projectId = req.params.id

  try {
    const isAdmin = await projectMember.findOne({
      user: userId,
      project: projectId,
    })

    if(!isAdmin || isAdmin.role !== 'admin'){
      return res.status(403).json({ message: 'unauthorized'})
    }

    //get all projectMembers
    const projectMembers = await projectMember.find({
      project: projectId,
      role: { $ne: "admin" }, // exclude admin from the list
    }).populate('user', 'name email')

    return res.status(200).json({message: 'project members retrieved', projectMembers})

  } catch (error) {
    res.status(500).json({message: 'internal server error'})
    console.log(error)
  }
}

export const addMemberToProject = async (req, res) => {

  const userId = req.user._id
  const projectId = req.params.id
  const { email } = req.body

  try {
    const project = await Project.findById(projectId)

    if(!project){
      return res.status(400).json({message: 'project not found'})
    }

    //check if user is admin
    const isAdmin = await projectMember.findOne({
      user: userId,
      project: projectId,
    })

    if(!isAdmin || isAdmin.role !== 'admin'){
      return res.status(403).json({ message: 'not authorized'})
    }

    //check if user is in organization
    //first get the user
    const user = await User.findOne({ email })

    if(!user){
      return res.status(403).json({ message: 'user does not exist'})
    }

    const isOrgMember = await organizationMember.findOne({
      user: user._id,
      organization: project.organization
    })

    if(!isOrgMember){
      return res.status(403).json({ message: 'user is not in organization'})
    }
    
    // check if user is already a member in this project
    const isProjectMember = await projectMember.findOne({
      user: user._id,
      project: projectId,
    })

    if(isProjectMember){
      return res.status(409).json({ message: 'user is already a project member'})
    }

    //adding user to project
    const newProjectMember = await projectMember.create({
      user: user._id,
      project: projectId,
      role: 'member'
    })
    
    return res.status(200).json({message: 'user added to project', newProjectMember})
  } catch (error) {
    res.status(500).json({message: 'internal server error'})
    console.log(error)
  }
}

export const removeMemberFromProject = async (req, res) => {

  const userId = req.user._id
  const projectId = req.params.id
  const { name, email } = req.body

  if(!name || !email) {
    return res.status(400).json({ message: 'name and email are required'})
  }

  try {
    const project = await Project.findById(projectId)

    if(!project){
      return res.status(400).json({message: 'project not found'})
    }
    
    const isAdmin = await projectMember.findOne({
      user: userId,
      project: projectId,
    })

    if(!isAdmin || isAdmin.role !== 'admin'){
      return res.status(403).json({ message: 'not authorized'})
    }

    //first get the user
    const user = await User.findOne({
      email,
      name,
    })
    
    if(!user){
      return res.status(403).json({ message: 'user does not exist'})
    }

    if(user._id.toString() === userId.toString()){
      return res.status(400).json({
        message: "admin cannot remove himself"
      })
    }
    
    // check if user is already a member in this project
    const isProjectMember = await projectMember.findOne({
      user: user._id,
      project: projectId,
    })

    if(!isProjectMember){
      return res.status(403).json({ message: 'user is not a project member'})
    }

    //deleting user from project
   await projectMember.deleteOne({
    user: user._id,
    project: projectId
  })
    
    return res.status(200).json({message: 'user deleted from project'})
  } catch (error) {
    res.status(500).json({message: 'internal server error'})
    console.log(error)
  }
}

export const promoteMember = async (req, res) => {

  const userId = req.user._id
  const projectId = req.params.id
  const { name, email } = req.body

  if(!name || !email) {
    return res.status(400).json({ message: 'name and email are required'})
  }

  try {
    const project = await Project.findById(projectId)

    if(!project){
      return res.status(400).json({message: 'project not found'})
    }

    const isAdmin = await projectMember.findOne({
      user: userId,
      project: projectId,
    })

    if(!isAdmin || isAdmin.role !== 'admin'){
      return res.status(403).json({ message: 'not authorized'})
    }
    //first get the user
    const user = await User.findOne({
      email,
      name,
    })
    
    if(!user){
      return res.status(403).json({ message: 'user does not exist'})
    }

    if(user._id.toString() === userId.toString()){
      return res.status(400).json({
        message: "admin cannot promote himself"
      })
    }

    // check if user is already a member in this project
    const isProjectMember = await projectMember.findOne({
      user: user._id,
      project: projectId,
    })
    
    if(!isProjectMember || isProjectMember.role === 'admin'){
      return res.status(403).json({ message: 'user is not a project member'})
    }

    //updating user role to admin
    isProjectMember.role = 'admin'
    await isProjectMember.save()

    return res.status(200).json({message: 'user promoted to admin'})
  } catch (error) {
    res.status(500).json({message: 'internal server error'})
    console.log(error)
  }
}

export const demoteMember = async (req, res) => {

  const userId = req.user._id
  const projectId = req.params.id
  const { name, email } = req.body

  if(!name || !email) {
    return res.status(400).json({ message: 'name and email are required'})
  }

  try {
   const project = await Project.findById(projectId)

    if(!project){
      return res.status(400).json({message: 'project not found'})
    }
    
    const isAdmin = await projectMember.findOne({
      user: userId,
      project: projectId,
    })

    if(!isAdmin || isAdmin.role !== 'admin'){
      return res.status(403).json({ message: 'not authorized'})
    }

    //first get the user
    const user = await User.findOne({
      email,
      name,
    })

    if(!user){
      return res.status(403).json({ message: 'user does not exist'})
    }
    
    if(user._id.toString() === userId.toString()){
      return res.status(400).json({
        message: "admin cannot demote himself"
      })
    }

    // check if user is already a member in this project
    const isProjectMember = await projectMember.findOne({
      user: user._id,
      project: projectId,
    })

    if(!isProjectMember || isProjectMember.role !== 'admin'){
      return res.status(403).json({ message: 'user is not a project member'})
    }

    //updating user role to member
    isProjectMember.role = 'member'
    await isProjectMember.save()

    return res.status(200).json({message: 'user demoted to member'})
  } catch (error) {
    res.status(500).json({message: 'internal server error'})
    console.log(error)
  }
}