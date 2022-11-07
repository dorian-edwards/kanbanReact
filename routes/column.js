const router = require('../utils/router')
const columnController = require('../controllers/column')

router.get('/', columnController.getAll)
router.post('/', columnController.create)
router.get('/:id', columnController.get)
router.delete('/:id', columnController.delete)

module.exports = router
