const express = require('express')
const taskController = require('../controllers/task')
const router = express.Router()

router.post('/', taskController.createTask)
router.get('/', taskController.getAllTasks)
router.get('/:id', taskController.getTask)
router.delete('/:id', taskController.delete)

module.exports = router
