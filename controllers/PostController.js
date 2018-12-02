const mongoose=require('mongoose');
PostModel=require('../models/Post');

const PostController={};

PostController.create=function(req,res){
    let datos={
        nombre:req.body.nombre,
        facultad:req.body.facultad,
        numero:req.body.numero
    }

    if(datos.nombre && datos.facultad && datos.numero && datos.nombre!='' && datos.facultad!='' && datos.numero!=''){
        let nuevoPost = new PostModel(datos);
        nuevoPost.save(function(err,guardado){
            if(err){
                res.status(500);
                res.json({code:500,err});
            }else{
                return res.json({ok:true,message:'se ha guardado con exito',guardado});
            }
        })
    }else{
        res.json({message:'ocurrio un error en la transaccion'});
        res.status(400);
    };
};
PostController.getAll=function(req,res){
    PostModel.find({},function(err,posts){
        if(err){
            res.status(500);
            res.json({code:500,err});
        }else{
            res.json({ok:true,posts});
        }
    });

};
PostController.get=function(req,res){
    PostModel.findOne({_id:req.params.id},function(err,post){
        if(err){
            res.status(500);
            res.json({code:500,err});
        }else{
            res.json({ok:true,post});
        }
    });

};

PostController.update=function(req,res){
    let update={
        nombre:req.body.nombre,
        facultad:req.body.facultad,
        numero:req.body.numero
    };

    PostModel.findByIdAndUpdate(req.params.id,update,function(err,old){
        if(err){
            res.status(500);
            res.json({code:500,err});
        }else{
            res.json({ok:true,old,update});
        }
    });
};

PostController.delete=function(req,res){
    PostModel.findByIdAndRemove(req.params.id,function(err,eliminado){
        if(err){
            res.status(500);
            res.json({code:500,err});
        }else{
            res.json({ok:true,eliminado});
        }
    });
}
module.exports= PostController;
