const express = require('express')
const userRoute = express.Router()
const { deleteTodo } = require('../controllers/userControllers/deleteTodo')
const { patchTodo } = require('../controllers/userControllers/patchTodo')
const { postTodo } = require('../controllers/userControllers/postTodo')
const { getTodo } = require('../controllers/userControllers/getTodo')
const { authCookie } = require('../middlewares/authCookie')

userRoute.delete('/todo', authCookie, deleteTodo)
userRoute.patch('/todo', authCookie, patchTodo)
userRoute.post('/todo', authCookie, postTodo)
userRoute.get('/todo', authCookie, getTodo)

exports.userRoute = userRoute