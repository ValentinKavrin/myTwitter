const dbAuth = require('../database/dtAuth')
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('../config')

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController{
    async registration(req, res){
        try {
            const {userName, name, surname, password} = req.body
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json( {message: 'Ошибка при регистрации', errors} )
            }
            const candidate = await dbAuth.getAllUser(userName)
            if (candidate.rows.length === 1){
                return res.status(400).json( {message: 'Пользователь уже существует'} )
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const newPerson = await dbAuth.newPerson(userName, name, surname, hashPassword)
            return res.status(201).json( {message: 'Пользователь успешно зарегистрирован'} )
        } catch (error) {
            console.log(error)
            res.status(400).json( {message: 'Registration error'} )
        }
    }

    async login(req, res){
        try {
            const {userName, password} = req.body
            const candidate = await dbAuth.getAllUser(userName)
            if (candidate.rows.length === 0){
                return res.status(400).json( {message: `Пользователь c ником ${userName} не существует`} )
            }
            const validPassword = bcrypt.compareSync(password, candidate.rows[0].password)
            if (!validPassword){
                return res.status(400).json( {message: `Пароль неверный`} )
            }
            const token = generateAccessToken(candidate.rows[0].id)
            return res.json({token})
        } catch (error) {
            console.log(error)
            res.status(400).json( {message: 'Login error'} )
        }
    }

    async getUser(req, res){
        try { 
            const users = await dbAuth.getAll()
            res.json(users.rows)
        } catch (error) {
            
        }
    }
}

module.exports = new authController()