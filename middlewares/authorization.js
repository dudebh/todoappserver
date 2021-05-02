const {Todo} = require('../models')
const authorization = async (req, res, next)=>{
    try {
        const foundData = await Todo.findByPk(+req.params.id)
        if(foundData){
            if(foundData.UserId === req.currentUser.id){
                next()                
            }else{
                next({code: 401, msg: 'You are not authorize'})
            }
        }else{
            next({code: 404})
        }    
    } catch (err) {
        next({code: 500, msg: err.message})
    }
}

module.exports = authorization