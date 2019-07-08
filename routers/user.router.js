const router = require('express').Router();

module.exports = (wagner) =>{


    const userCtrl = wagner.invoke((User)=>
    require('../controllers/user.controller')(User));

    router.post('/',(req,res)=>{
        userCtrl.createUser(req,res);
    });

    router.get('/',(req,res)=>{
            userCtrl.findAll(req,res);    
    });

    router.get('/:id',(req,res)=>{
        userCtrl.findId(req,res);
    });

    router.delete('/:id',(req,res)=>{
        userCtrl.DeleteById(req,res);
    });

    router.put('/:id',(req,res)=>{
        userCtrl.updateUsuario(req,res);
    });

    router.get('/login/:email/:password',(req,res)=>{
        userCtrl.login(req,res);
    });

    return router;
}