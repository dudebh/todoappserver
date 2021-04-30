const errorHandler = (err, req, res, next)=>{
    
    let message
    switch (err.code) {
        case 500:
            message = 'Internal server error'
            break;
        case 404:
            message = 'Data not found'
            break;
        default:
            break;
    }
    if(err.msg){
        message = err.msg;
    }
    res.status(err.code).json({message: message})
}

module.exports = errorHandler