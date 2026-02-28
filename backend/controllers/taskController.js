import ProjectMember from "../models/projectMemberModel";
import Task from "../models/taskModel";

export const getTask = async (req, res) => {
  const userId = req.user._id;

  try {
    const tasks = await Task.find({ assignedTo: userId });

    if (!tasks) {
      res.status(403).json({ message: "no tasks found" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

export const getTasks = async (req, res) => {
  const userId = req.user._id;
  const projectId = req.params._id;

  try {
    const projectAdmin = await ProjectMember.find({
        project: projectId,
        user: userId,
    })

    if(!projectAdmin || projectAdmin.role !== "admin"){
        res.stats(403).json({message: 'unauthorized to get tasks'})
    }

    const tasks = await Task.find({
        project: projectId,
        createdBy: userId,
    })

    if(!tasks || tasks.length === 0){
        res.status(400).json({ message: 'no tasks found'})
    }

    res.status(200).json({ message: 'tasks found', tasks})

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error fetching tasks" });
  }
};


export const addTask = async(req, res) => {
    const userId = req.user._id
    const projectId = req.params.id

    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error adding task"})
    }
}