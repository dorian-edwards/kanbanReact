const express = require('express')
const router = express.Router()
const subtaskController = require('../controllers/subtask')

router.get('/', subtaskController.getAllSubtasks)
router.get('/:id', subtaskController.getSubtask)
router.post('/', subtaskController.createSubtask)
router.put('/:id', subtaskController.update)
router.put('/:id/toggle', subtaskController.toggleComplete)
router.delete('/:id', subtaskController.deleteSubtask)

module.exports = router
