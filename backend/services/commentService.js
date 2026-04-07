import Comments from "../models/commentsModel.js"

export const deleteComment = async (taskId) => {
    await Comments.deleteOne({
        task: taskId
    })
}