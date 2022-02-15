const Router = require('express')
const userController = require('../controller/user.controller')
const authMiddlewaree = require('../middlewaree/authMiddlewaree')
const router = new Router()

router.get('/user/:id', authMiddlewaree, userController.getOneUser)
router.put('/user', userController.updateUser)
router.delete('/user', userController.deleteUser)


module.exports = router