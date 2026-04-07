import express from "express";
import {
  addMemberToProject,
  deleteProject,
  demoteMember,
  getProject,
  getProjectMembers,
  promoteMember,
  removeMemberFromProject,
} from "../controllers/projectController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addTask, deleteTask, getTasks, updateTask, updateTaskByAdmin } from "../controllers/taskController.js";


const router = express.Router();


router.get('/my', authMiddleware, getProject)
router.delete("/:id", authMiddleware, deleteProject);

router.get('/:id/members', authMiddleware, getProjectMembers);
router.post('/:id/addMember', authMiddleware, addMemberToProject)
router.post('/:id/removeMember', authMiddleware, removeMemberFromProject)

router.put('/:id/promote', authMiddleware, promoteMember)
router.put('/:id/demote', authMiddleware, demoteMember)
// todo: update project

// get the admin tasks that he created in the project
router.get('/:id/task', authMiddleware, getTasks)

router.post('/:id/task', authMiddleware, addTask)
router.delete('/:id/task/:taskId', authMiddleware, deleteTask)
router.put('/:id/task/:taskId', authMiddleware, updateTaskByAdmin)
router.put('/task/:taskId/status', authMiddleware, updateTask)

// update task: for admin update all fields

export default router;
