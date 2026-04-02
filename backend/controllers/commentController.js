import Comments from "../models/commentsModel.js"
import Task from "../models/taskModel.js"





// get comments for the user who is assigned to the task.
// for the admin we create another function that get comments for all tasks.
export const getComments = async (req, res) => {
    const userId = req.user._id
    const taskId = req.params.taskId

    try {
        // i think we can just get the comments by task id, because the user can not access the task if it is not assigned to him.

        const comments = await Comments.find({
            user: userId,
            task: taskId
        })
        return res.status(200).json(comments)

    } catch (error) {
        return res.status(500).json({ message: "Error fetching comments" })
        console.log(error)
    }

}

export const createComment = async (req, res) => {
    const userId = req.user._id
    const taskId = req.params.taskId
    const { content } = req.body

    try {
       
    } catch (error) {
        return res.status(500).json({ message: "Error creating comment" })
        console.log(error)
    }

}