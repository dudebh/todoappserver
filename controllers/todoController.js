const {Todo, User} = require('../models')
const axios = require('axios');
const sendEmail = require('../helpers/nodemailer')

class todoController{
    static getTodo(req, res, next){
        Todo
            .findAll({
                where:{UserId: req.currentUser.id}
            })
            .then(data=>{
                res.status(200).json(data)
            })
            .catch(err=>{
                next({
                    code: 500
                })
            })

    }

    static getTodoById(req, res, next){
        let id = req.params.id
        Todo
            .findByPk(id)
            .then(data=>{
                if(!data){
                    next({code: 404}) //data not found
                }else{
                    res.status(200).json(data)
                }
                
            })
            .catch(err=>{
                next({
                    code: 500
                })
            })
    }

    static postTodo(req, res, next){
        let {title, description, status, due_date, UserId} = req.body
        let input = {title, description, status, due_date, UserId: req.currentUser.id}
        Todo
            .create(input)
            .then(data=>{
                sendEmail(req.currentUser.email, data)
                res.status(201).json(data)
            })
            .catch(err=>{
                if(err.message === 'Validation error'){
                    next({code:400, msg: err.errors[0].message})
                }else{
                    next({code: 500,msg: err.message})
                }
            })
    }

    static putTodo(req, res, next){
        const id = req.params.id
        let {title, description, status, due_date} = req.body
        let input = {title, description, status, due_date, UserId: req.currentUser.id}
        Todo
            .update(input, {
                where:{id: id},
                returning: true
            })
            .then(data=>{
                res.status(200).json(data[1][0])
            })
            .catch(err=>{
                if(err.message === 'Validation error'){
                    next({code:400, msg: err.errors[0].message})
                }else{
                    next({code: 500,msg: err.message})
                }
            })
    }

    static patchTodo(req, res, next){
        let id = req.params.id
        let status = req.body.status
        Todo
            .update({status}, {
                where:{id: id},
                returning: true
            })
            .then(data=>{
                if(!data[1][0]){
                    next({code: 404})
                }
                res.status(200).json(data[1][0])
            })
            .catch(err=>{
                if(err.message === 'Validation error'){
                    next({code:400, msg: err.errors[0].message})
                }else{
                    next({code: 500,msg: err.message})
                }
            })
    }

    static deleteTodo(req, res, next){
        let id = req.params.id
        let deletedData
        Todo
            .findByPk(id)
            .then(data=>{
                deletedData = data
                return Todo.destroy({where:{id: id}})
            })
            .then(data=>{
                if(!deletedData){
                    next({code: 404})
                }else{
                    res.status(200).json(deletedData)
                }
            })
            .catch(err=>{
                next({
                    code: 500
                })
            })
    }

    static getSuggest(req, res, next){
        const url = `http://www.boredapi.com/api/activity?type=${req.query.type}`
        axios.get(url)
            .then( response => {
                res.status(200).json(response.data)
            })
            .catch(err=>{
                console.log(err);
                next({
                    code: 500
                })
            })
    }
}

module.exports = todoController