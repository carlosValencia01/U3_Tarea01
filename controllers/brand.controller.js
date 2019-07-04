const http=require('http');
const path=require('path');
const status = require('http-status');

let _brand;

const createBrand = (req,res) =>{
    const brand = req.body;

    _brand.create(brand)
    .then((data)=>{
        res.status(200);
        res.json({msg:"Brand creada correctamente",data:data});
    })
    .catch((err)=>{
        res.status(400);
        res.json({msg:"Error",data:err});
    })
};//createBrand

const findAll = (req,res)=>{
    _brand.find()
        .then((data)=>{
            if(data.length==0){
                res.status(status.NO_CONTENT);
                res.json({msg:"No se encontraron brand"})
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

const findId = (req,res)=>{
    const {id} = req.params;//const id = req.params.id;

    const params = {
        _id:id
    }

    _brand.find({_id:id})
        .then((data)=>{
            if(data.length==0){
                res.status(status.NO_CONTENT);
                res.json({msg:"No se encontraron brand"})
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

    _brand.findByIdAndRemove(id)
        .then((data)=>{
            res.status(status.OK);
            res.json({msg:"Exito",data:data});
        })
        .catch((err)=>{
            res.status(status.NOT_FOUND);
            res.json({msg:"No se encontro"});
        })
}






module.exports = (Brand)=>{
    _brand = Brand;
    return({
        createBrand,
        findAll,
        DeleteById,
        findId
    })
}