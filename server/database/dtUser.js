const res = require('express/lib/response')
const db = require('../db')

const getOneUser = async function (id) {
    const user = await db.query(`SELECT name, surname, username from person where id = $1`, [id])
    return user
}

const updateUser = async function (id, name, surname) {
    const user = await db.query(
        'UPDATE person set name = $1, surname = $2 where id = $3 RETURNING *', [name, surname, id])
    return true
}

const deleteUser = async function (id) {
    try {
        const deletePost = await db.query(`DELETE from post where user_id = $1`, [id])
        const user = await db.query(`DELETE from person where id = $1`, [id])
        if (user.rowCount === 0) {
            return false
        }
        return true
    } catch (error) {
        console.log(error)
        res.status(400).json( {message: 'Delete error'} )
    }
}

module.exports = {
    getOneUser,
    updateUser,
    deleteUser
}