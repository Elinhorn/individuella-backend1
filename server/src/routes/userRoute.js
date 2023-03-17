//här ska delete, post, patch, get vara
const express = require('express')
const userRoute = express.Router()
const { deleteTodo } = require('../controllers/userControllers/deleteTodo')
const { patchTodo } = require('../controllers/userControllers/patchTodo')
const { postTodo } = require('../controllers/userControllers/postTodo')

userRoute.delete('/todo', deleteTodo)
userRoute.patch('/todo', patchTodo)
userRoute.post('/todo', postTodo)

exports.userRoute = userRoute