const Router = require('express')
const {check} = require("express-validator")
const postController = require('../controller/post.controller')
const authMiddlewaree = require('../middlewaree/authMiddlewaree')
const router = new Router()

router.post('/post', [
    check('title', "Необходимо написать заголовок").notEmpty(),
    check('content', "Введите описание больше 3-х символов").isLength({min:3})
], postController.createPost)
router.get('/post/:id', authMiddlewaree, postController.onePost)
router.get('/posts/:id', authMiddlewaree, postController.getPostByUser)
router.get('/posts' , authMiddlewaree, postController.getPosts)
router.put('/post/:id', authMiddlewaree, postController.updatePost)
router.delete('/post', authMiddlewaree, postController.deletePost)

module.exports = router