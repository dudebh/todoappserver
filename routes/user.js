const router = require('express').Router()
const Controller = require('../controllers/userController')

router.post('/register', Controller.postUser)
router.post('/login', Controller.postLogin)
router.post('/googlelogin', Controller.googleLogin)

module.exports = router