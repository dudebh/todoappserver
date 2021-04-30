const {User} = require('../models')
const {verify} = require('../helpers/jwt')

const authentication = async (req, res, next)=>{    
    try {
        if(!req.headers.access_token){
            next({code: 403, msg: "Please login first"})
        }
        const decoded = verify(req.headers.access_token)
        const foundUser = await User.findByPk(decoded.id)
        if(foundUser){
            req.currentUser = decoded
            next()
        }else{
            next({code: 403, msg: 'Invalid access token'})
        }
    } catch (err) {
        next({code: 500, msg: err.message})
    }
   
}

module.exports = authentication