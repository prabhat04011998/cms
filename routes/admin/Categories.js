const express=require('express');
const router=express.Router();
const Category=require('../../models/Category');


router.all('/*',(req,res,next)=>{
    req.app.locals.layout='admin';
    next();
})


router.get('/',(req,res)=>{
    Category.find({}).then(categories=>{
        res.render('admin/categories/index',{categories:categories});
    }).catch(error=>{
        res.send(error); 
    })
    
});

router.post('/create',(req,res)=>{
    const newCategory=new Category({
        name:req.body.name,

    });
    newCategory.save().then(savedCategory=>{
        res.render('admin/categories');
    });
})


module.exports=router;