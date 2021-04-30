const router = require('express').Router()
const Controller = require('../controllers/todoController')
const authorization = require('../middlewares/authorization')

router.get('/todo', Controller.getTodo)
router.post('/todo', Controller.postTodo)
router.get('/todo/suggest', Controller.getSuggest)

router.use('/todo/:id',authorization)

router.get('/todo/:id', Controller.getTodoById)
router.put('/todo/:id', Controller.putTodo)
router.patch('/todo/:id', Controller.patchTodo)
router.delete('/todo/:id', Controller.deleteTodo)

module.exports = router