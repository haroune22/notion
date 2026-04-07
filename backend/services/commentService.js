import Comments from "../models/commentsModel.js"

export const deleteCommentService = async (taskId) => {
    await Comments.deleteMany({
        task: taskId
    })
}