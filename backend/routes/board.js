const express = require('express')
const boardController = require('../controllers/board')
const router = express.Router()

router.post('/new', boardController.createBoard)
router.get('/all', boardController.getAllBoards)
router.get('/:id', boardController.getBoard)
router.put('/:id', boardController.updateBoard)
router.delete('/:id/', boardController.deleteBoard)

module.exports = router
