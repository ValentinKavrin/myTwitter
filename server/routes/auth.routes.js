const Router = require('express')
const {check} = require("express-validator")
const authController= require('../controller/auth.controller')
const authMiddlewaree = require('../middlewaree/authMiddlewaree')
const router = new Router()

router.post('/registration', [
    check('userName', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 3 символов").isLength({min:3})
], authController.registration)
router.post('/login', authController.login)
router.get('/users', authMiddlewaree, authController.getUser)

module.exports = router