const res = require('express/lib/response')
const db = require('../db')

const createPost = async function (title, content, idUser) {
    const data = new Date()
    const newPost = await db.query(
        `INSERT INTO post (title, content, user_id, date) values ($1, $2, $3, $4) RETURNiNG *`, 
        [title, content, idUser, data]
    )
    return newPost
}

const onePost = async function (postId, idUser) {
    const onePost = await db.query('select title, content, date from post  where id_post = $1', [postId])
    if (onePost.rowCount === 0) {
        return false
    }
    return onePost
}

const getPostByUser = async function (userId) {
    const posts = await db.query('select * from post where user_id = $1', [userId])
    if (posts.rowCount === 0) {
        return false
    }
    return posts
}

const getPosts = async function () {
    const posts = await db.query(`select id_post, name, surname, title, content, date from person, post where user_id = id`)
    return posts
}

const updatePost = async function (idPost, title, content) {
    const updatePost = await db.query(`UPDATE post set title = $1, content = $2 where id_post = $3 `, [title, content, idPost])
    if (updatePost.rowCount === 0) {
        return false
    }
    return updatePost
}

const deletePost = async function (id) {
    const post = await db.query('DELETE from post where id_post = $1', [id]) 
    return true
}
module.exports = {
    createPost,
    onePost,
    getPostByUser,
    getPosts,
    updatePost,
    deletePost
}