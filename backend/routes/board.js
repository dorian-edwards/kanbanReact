const express = require('express')
const boardController = require('../controllers/board')
const router = express.Router()

router.get('/', boardController.getAllBoards)
router.post('/', boardController.createBoard)
router.get('/:id', boardController.getBoard)
router.put('/:id', boardController.updateBoard)
router.delete('/:id/', boardController.deleteBoard)

module.exports = router
