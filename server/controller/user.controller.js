const dbUser = require('../database/dtUser')
const jwt = require('jsonwebtoken')
const { secret } = require("../config")

class UserController{
    // возвращает клиенту конкретного пользователя
    async getOneUser(req,res){
        const id = req.params.id
        const user = await dbUser.getOneUser(id)
        res.json(user.rows[0])
    }
    // обновляет данные пользователей
    async updateUser(req,res){
        const token = req.headers.authorization.split(' ')[1]  
        if (!token) {
            return res.status(401).json( {message: 'Необходимо авторизоваться'} )
        } 
        const { id: idUser } = jwt.verify(token, secret)
        const {name, surname} = req.body
        const user = await dbUser.updateUser(idUser, name, surname)
        res.json(user.rows[0])
    }
    // удаляет данные пользователей
    async deleteUser(req,res){
        const token = req.headers.authorization.split(' ')[1]  
        if (!token) {
            return res.status(401).json( {message: 'Необходимо авторизоваться'} )
        } 
        const { id: idUser } = jwt.verify(token, secret)
        const user = await dbUser.deleteUser(idUser)
        if (user === false) {
            return res.status(400).json( {message: 'Пользователь не найден'} )
        }
        return res.status(200).json( {message: 'User deleted - successfully'} )
    }
}

module.exports = new UserController()