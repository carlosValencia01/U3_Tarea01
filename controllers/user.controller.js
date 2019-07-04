const http=require('http');
const path=require('path');
const status = require('http-status');

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

module.exports = (User)=>{
    _user = User;
    return({
        createUser,
        findAll,
        DeleteById,
        findId
    })
}

