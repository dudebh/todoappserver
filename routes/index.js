const router = require('express').Router()
const userRouter = require('./user')
const todoRouter = require('./todo')
const authentication = require('../middlewares/authentication')


router.use(userRouter)

router.use(authentication)

router.use(todoRouter)

module.exports = router;