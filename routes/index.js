const router = require('express').Router()
const userRouter = require('./user')
const todoRouter = require('./todo')
const authentication = require('../middlewares/authentication')

router('/',(req, res)=>{
    res.send('todoapp server')
})
router.use(userRouter)

router.use(authentication)

router.use(todoRouter)

module.exports = router;