import ProjectMember from "../models/projectMemberModel.js";
import Project from "../models/projectModel.js";
import Task, { taskStatusEnum } from "../models/taskModel.js";

export const getTask = async (req, res) => {
  const userId = req.user._id;

  try {
    // we could add verify if user is a projectMember but will keep this way because we are filtering by assignedTo:
    const tasks = await Task.find({ assignedTo: userId });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "no tasks found" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching tasks", error });
  }
};

export const getTasks = async (req, res) => {
  const userId = req.user._id;
  const projectId = req.params._id;

  try {
    const member = await ProjectMember.findOne({
      project: projectId,
      user: userId
    })

    if(!member){
      return res.status(403).json({ message: "not a project member" })
    }

    const tasks = await Task.find({
      project: projectId,
    });

    if (!tasks || tasks.length === 0) {
      return res.status(400).json({ message: "no tasks found" });
    }

    res.status(200).json({ message: "tasks found", tasks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error fetching tasks" });
  }
};

export const addTask = async (req, res) => {
  const userId = req.user._id;
  const projectId = req.params.id;

  const { title, description, assignedTo, dueDate, priority } = req.body;

  if (!title || !description || !assignedTo || !dueDate) {
    return res.status(400).json({ message: "all fields required" });
  }

  const priorityEnum = ["low", "medium", "high"]

  if(!priorityEnum.includes(priority)){
    return res.status(400).json({message:"invalid priority"})
  }

  try {
    // check if the user is admin
    const projectAdmin = await ProjectMember.findOne({
        project: projectId,
        user: userId,
    })
  
    if(!projectAdmin || projectAdmin.role !== 'admin'){
        return res.status(403).json({ message :'not a allowed to add task on this project'})
    }
    // checking if the user is a project member
    const projectMember = await ProjectMember.findOne({
        project: projectId,
        user: assignedTo,
    })

    if(!projectMember){
        return res.status(403).json({ message :'not a project member'})
    }

    const newTask = await Task.create({
        title,
        description,
        assignedTo,
        createdBy: userId,
        dueDate,
        priority,
        project: projectId
    })

    return res.status(200).json({ message: 'task created', newTask})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error adding task" });
  }
};


export const deleteTask = async (req, res) => {
    const userId = req.user._id
    const projectId = req.params.id
    const taskId = req.params.taskId

    try {
        const projectAdmin = await ProjectMember.findOne({
            project: projectId,
            user: userId,
        })

        if(!projectAdmin || projectAdmin.role !== 'admin'){
            return res.status(403).json({ message :'not a allowed to delete task on this project'})
        }

        const deletedTask = await Task.findOneAndDelete({
            _id: taskId,
            project: projectId
        })

        if(!deletedTask){
            return res.status(400).json({ message: 'task not found'})
        }

        return res.status(200).json({ message: 'task deleted'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error deleting task" });
    }
}

export const updateTaskByAdmin = async (req, res) => {

  const userId = req.user._id
  const projectId = req.params.id
  const taskId = req.params.taskId
  const { title, description, status, priority, assignedTo, dueDate } = req.body

  try {
    const project = await Project.findById(projectId)

    if(!project){
      return res.status(403).json({ message: "not found "})
    }

    const isAdmin = await ProjectMember.findOne({
      project: projectId,
      user: userId,
    })

    if(!isAdmin || isAdmin.role !== 'admin'){
      return res.status(409).json({ message: 'not authorized'})
    }

    const task = await Task.findById(taskId)

    if(!task || task.project.toString() !== projectId.toString()){
      return res.status(402).json({message: "task not found"})
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, {
      title,
      description,
      dueDate,
      status,
      priority,
      assignedTo
    },{new: true})

    return res.status(200).json({message: 'task updated', updatedTask})

  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "error deleting task" });
  }
}

export const updateTask = async (req, res) => {

  const userId = req.user._id
  const taskId = req.params.taskId
  const { status } = req.body

  if(!status || !taskStatusEnum.includes(status)){
    return res.status(403).json({ message: 'status required '})
  }

  try {
    const task = await Task.findById(taskId)

    if(!task || task.assignedTo.toString() !== userId.toString()){
      return res.status(402).json({message: "task not found"})
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, {
      status,
    }, {new: true})

    return res.status(200).json({message: 'task updated', updatedTask})

  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "error deleting task" });
  }
}