import Comments from "../models/commentsModel.js"
import ProjectMember from "../models/projectMemberModel.js"
import Task from "../models/taskModel.js"



// get comments for the user who is assigned to the task.
// for the admin we create another function that get comments for all tasks.
export const getComments = async (req, res) => {
    const userId = req.user._id
    const taskId = req.params.taskId

    try {
        const task = await Task.findById(taskId)
        
        if(!task){
            return res.status(404).json({message:'task not found'})
        }

        const projectId = task.project

        const isProjectMember = await ProjectMember.findOne({
            user: userId,
            project: projectId
        })

         if(!isProjectMember){
            return res.status(403).json({message:'not authorized'})
        }

       const comments = await Comments
        .find({ task: taskId })
        .populate('user', 'name email')

        return res.status(200).json({message: 'comments found', comments})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error fetching comments" })
    }

}

export const createComment = async (req, res) => {
    const userId = req.user._id
    const taskId = req.params.taskId
    const { content } = req.body

    if(!content){
        return res.status(400).json({message:'content required'})
    }

    try {
        const task = await Task.findById(taskId)
        
        if(!task){
            return res.status(404).json({message:'task not found'})
        }

        const projectId = task.project

        const isProjectMember = await ProjectMember.findOne({
            user: userId,
            project: projectId
        })

         if(!isProjectMember){
            return res.status(403).json({message:'not authorized'})
        }

        const comment = await Comments.create({
            user: userId,
            content,
            task:taskId,
        })

        return res.status(200).json({message: 'comment created', comment})
       
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error creating comment" })
    }

}

export const removeComment = async (req, res) => {

    const userId = req.user._id
    const taskId = req.params.taskId
    const commentId = req.params.commentId

    try {
        
        const task = await Task.findById(taskId)
        
        if(!task){
            return res.status(404).json({message:'task not found'})
        }
        
        const projectId = task.project
        
        const isProjectMember = await ProjectMember.findOne({
            user: userId,
            project: projectId
        })
        
        if(!isProjectMember){
            return res.status(403).json({message:'not authorized'})
        }
        
        const comment = await Comments.findById(commentId)

        if (comment.user.toString() !== userId.toString() && isProjectMember.role !== 'admin') {
            return res.status(403).json({ message: 'not authorized' })
        }

        await Comments.findByIdAndDelete(commentId)

        return res.status(200).json({message:'comment deleted'})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error creating comment" })
    }
}