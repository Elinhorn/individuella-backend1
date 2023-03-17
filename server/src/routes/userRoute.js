//här ska delete, post, patch, get vara
const express = require('express')
const userRoute = express.Router()
const { deleteTodo } = require('../controllers/userControllers/deleteTodo')
const { patchTodo } = require('../controllers/userControllers/patchTodo')
const { postTodo } = require('../controllers/userControllers/postTodo')
const { authCookie } = require('../middlewares/authCookie')

userRoute.delete('/todo', authCookie, deleteTodo)
userRoute.patch('/todo', authCookie, patchTodo)
userRoute.post('/todo', authCookie, postTodo)

exports.userRoute = userRoute