const http=require('http');
const path=require('path');
const status = require('http-status');

let _product;

const createProduct = (req,res) => {
    const product = req.body;

    _product.create(product)
    .then((data)=>{
        res.status(200);
        res.json({msg:"Product creado correctamente",data:data});
    })
    .catch((err)=>{
        res.status(400);
        res.json({msg:"Error de creacion",data:err});
    })
};
const findAll = (req,res)=>{
    _product.find()
        .then((data)=>{
            if(data.length==0){
                res.status(status.NO_CONTENT);
                res.json({msg:"No se encontraron products"});
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

    _product.find({_id:id})
        .then((data)=>{
            if(data.length==0){
                res.status(status.NO_CONTENT);
                res.json({msg:"No se encontro product"})
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

    _product.findByIdAndRemove(id)
        .then((data)=>{
            res.status(status.OK);
            res.json({msg:"Exito",data:data});
        })
        .catch((err)=>{
            res.status(status.NOT_FOUND);
            res.json({msg:"No se encontro"});
        })
}

const updateProduct = (req,res) =>{
    const {id} = req.params;

    _product.update({_id:id},{$set:req.body})
        .then((data)=>{
            res.status(status.OK);
            res.json({msg:"Product actualizado", data:data});
        })
        .catch((err)=>{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error",data:err});
        });        
}

module.exports = (Product)=>{
    _product = Product;
    return({
        createProduct,
        findAll,
        DeleteById,
        findId,
        updateProduct
    })
}

