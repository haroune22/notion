import ProjectMember from "../models/projectMemberModel.js";
import Task from "../models/taskModel";

export const getTask = async (req, res) => {
  const userId = req.user._id;

  try {
    // we could add verify if user is a projectMember but will keep this way because we are filtering by assignedTo:
    const tasks = await Task.find({ assignedTo: userId });

    if (!tasks || tasks.length === 0) {
      return res.status(403).json({ message: "no tasks found" });
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
    const projectAdmin = await ProjectMember.findOne({
      project: projectId,
      user: userId,
    });

    if (!projectAdmin || projectAdmin.role !== "admin") {
      return res.status(403).json({ message: "unauthorized to get tasks" });
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

  if (!title || !description || !assignedTo || !dueDate || !priority) {
    return res.status(400).json({ message: "all fields required" });
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