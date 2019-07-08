const http=require('http');
const path=require('path');
const status = require('http-status');
const jwt = require('jsonwebtoken');
const _config = require('../_config');

let _user;

const createUser = (req,res) => {
    const user = req.body;

    _user.create(user)
    .then((data)=>{
        res.status(200);
        res.json({msg:"Usuario creado correctamente",data:data});
    })
    .catch((err)=>{
        res.status(400);
        res.json({msg:"Error",data:err});
    })
};
const findAll = (req,res)=>{
    _user.find()
        .then((data)=>{
            if(data.length==0){
                res.status(status.NO_CONTENT);
                res.json({msg:"No se encontraron usuarios"});
            }else{
                res.status(status.OK);
                res.json({msg:"Exito",data:data});
            }
        })
        .catch((err)=>{
            res.status(status.BAD_REQUEST);
            res.json({msg:"Error"});
        });
}

const findId = (req,res)=>{
    const {id} = req.params;//const id = req.params.id;

    const params = {
        _id:id
    }

    _user.find({_id:id})
        .then((data)=>{
            if(data.length==0){
                res.status(status.NO_CONTENT);
                res.json({msg:"No se encontro user"})
            }else{
                res.status(status.OK);
                res.json({msg:"Exito",data:data});
            }
        })
        .catch((err)=>{
            res.status(status.BAD_REQUEST);
            res.json({msg:"Error",err:err});
        })
};



const DeleteById = (req,res) =>{
    const {id} = req.params;//const id = req.params.id;

    const params = {
        _id:id
    }

    _user.findByIdAndRemove(id)
        .then((data)=>{
            res.status(status.OK);
            res.json({msg:"Exito",data:data});
        })
        .catch((err)=>{
            res.status(status.NOT_FOUND);
            res.json({msg:"No se encontro"});
        })
}

const updateUsuario = (req,res) =>{
    const {id} = req.params;

    _user.update({_id:id},{$set:req.body})
        .then((data)=>{
            res.status(status.OK);
            res.json({msg:"Usuario actualizado", data:data});
        })
        .catch((err)=>{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error",data:err});
        });        
}

const login = (req,res) => {
    const {email, password} = req.params;
    let query = {email:email,password:password};
    _user.findOne(query,"-password")
    .then((user)=>{
        if(user){
            const token = jwt.sign({email:email},_config.SECRETJWT);
            res.status(status.OK);
            res.json({
                msg:"acceso exitoso",
                data:{
                    user:user,
                    token:token
                }
            })
        }else{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error no se encontro"});
        }
    })
    .catch((err)=>{
        res.status(status.NOT_FOUND);
        res.json({msg:"error no se encontro",err:err});
    })
}

module.exports = (User)=>{
    _user = User;
    return({
        createUser,
        findAll,
        DeleteById,
        findId,
        updateUsuario,
        login
    })
}