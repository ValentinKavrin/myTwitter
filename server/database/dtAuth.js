const db = require('../db')

const getAllUser = async function (userName) {
    const candidate = await db.query(`SELECT * from person where userName = $1`, [userName])
    return candidate
}

const newPerson = async function (userName, name, surname, hashPassword) {
    const newPerson = await db.query(
        `INSERT INTO person (userName, name, surname, password) values ($1, $2, $3, $4)`, 
        [userName, name, surname, hashPassword]
    )
    return newPerson
}

const getAll = async function () {
    const users = await db.query('SELECT * from person')
    return users
}

module.exports = {
    getAllUser,
    newPerson,
    getAll
}