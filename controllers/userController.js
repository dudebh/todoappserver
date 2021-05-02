const { User } = require('../models')
const { comparePwd } = require('../helpers/bcrypt')
const {sign} =  require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');



class UserController {
    static postUser(req, res, next){
        let { password, email } = req.body
        if(password.length < 6){
            next({code: 400,msg: 'password must have at least 6 characters'})
        }else{
            User
                .create({password, email})
                .then(data=>{
                    let {id, email, createdAt, updatedAt} = data;
                    let newData = {id, email, createdAt, updatedAt}
                    res.status(201).json('insert success')
                })
                .catch(err=>{
                    if(err.message === 'Validation error'){
                        next({code:400, msg: err.errors[0].message})
                    }else{
                        next({code: 500,msg: err.message})
                    }
                })
        }

    }

    static postLogin(req, res, next){
        let { password, email } = req.body
        User
            .findOne({
                where:{email: email}
            })
            .then(data=>{
                if((data) && comparePwd(password, data.password)){
                    let {id, email} = data
                    let access_token = sign({id, email})
                    res.status(200).json({access_token})
                }else{
                    next({code: 400, msg: 'incorrect email or password'})
                }
            })
            .catch(err=>{
                next({code: 500})
            })

    }

    static googleLogin(req, res, next){
        console.log('di kontroller');
        let email;
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket=>{
            const playload = ticket.getPayload();
            email = playload.email
            return User.findOne({where:{email: email}})
        })
        .then(user=>{
            if(!user){
                return User.create({
                    email: email,
                    password: "testes"
                })
            }else{
                const token = sign({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({access_token: token})
            }

        })
        .then(createdUser=>{
            const token = sign({
                id: createdUser.id,
                email: createdUser.email
            })
            res.status(200).json({access_token: token})
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: err.message})
        })
    }
}

module.exports = UserController