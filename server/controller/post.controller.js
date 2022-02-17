const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require("../config")
const dbPost = require('../database/dtPost')

class PostController{
    async createPost(req, res){
        try {
            const {title, content} = req.body
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json( {message: 'Необходимо авторизоваться'} )
            } 
            const { id: idUser } = jwt.verify(token, secret) 
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json( {message: 'Ошибка при создании поста', errors} )
            }
            const newPost = await dbPost.createPost(title, content, idUser)
            res.json(newPost.rows[0])
        } catch (error) {
            console.log(error)
            res.status(400).json( {message: 'New post error'} )
        }  
    }

    async onePost(req, res){
        const postId = req.params.id
        const onePost = await dbPost.onePost(postId)
        if (onePost === false) {
            return res.status(400).json( {message: 'Пост не найден, возможно был удален'} )
        }
        res.json(onePost.rows)
    }

    async getPostByUser(req, res){  
        const userId  = req.params.id
        const posts = await dbPost.getPostByUser(userId)
        if (posts === false) {
            return res.status(400).json( {message: 'Посты еще не были созданы'} )
        }
        res.json(posts.rows)
    }

    async getPosts(req,res) { 
        const posts = await dbPost.getPosts()
        res.json(posts.rows)
    }

    async updatePost(req, res) {
        try {
            const { title, content } = req.body
            const idPost = req.params.id
            const updatePost = await dbPost.updatePost(idPost, title, content)
            if (updatePost === false) {
                return res.status(400).json( {message: 'Update post error, post not found'} )
            }
            res.status(200).json( {message: 'Update post - successfully'} )
        } catch (error) {
            console.log(error)
            res.status(400).json( {message: 'Update post error'} )
        }
    }

    async deletePost(req, res) {
        try {
            const id = req.body.id
            if (!id) {
                return res.status(400).json( {message: 'Delete post error'} )
            }
            const deletePosts = await dbPost.deletePost(id)
            if (deletePosts === true) {
                return  res.json( {message: 'Пост удален'} )
            }
        } catch (error) {
            console.log(error)
            res.status(400).json( {message: 'Delete post error'} )
        }
    }
}

module.exports = new PostController()