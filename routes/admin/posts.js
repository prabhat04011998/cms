const express=require('express');
const router=express.Router();
const Post=require('../../models/Post');
const {isEmpty, uploadDir}=require('../../helpers/upload-helper');
const fs=require('fs');
var flash = require('connect-flash');
const path=require('path');      



router.all('/*',(req,res,next)=>{
    req.app.locals.layout='admin';
    next();
})

router.get('/',(req,res)=>{
    Post.find().then(posts=>{
        res.render('admin/posts',{posts:posts});
    }).catch(error=>{
        res.send(error); 
    })
    
});
router.get('/create',(req,res)=>{
    res.render('admin/posts/create')
})
router.get('/create',(req,res)=>{
    res.send('IT"S a Create page')
});
router.get('/edit/:id',(req,res)=>{
    Post.findOne({_id:req.params.id}).then(post=>{
        res.render('admin/posts/edit',{post:post});
    })
    
}) ;
router.put('/edit/:id',(req,res)=>{

    Post.findOne({_id:req.params.id}).then(post=>{

        if(req.body.allowComments){
            allowComments=true;
        }else{
            allowComments=false;
        }
        post.title=req.body.title;
        post.status=req.body.status;
        post.allowComments=allowComments;
        post.body=req.body.body;
        post.save().then(updatePost=>{
            res.redirect('/admin/posts');
        })

    })
});

router.delete('/:id',(req,res)=>{
    Post.findOne({_id:req.params.id}).then(post=>{
        fs.unlink(uploadDir+post.file,(err)=>{
            post.remove();
            //req.flash('success message','post was successfully deleted');
            res.redirect('/admin/posts');
        });
        
    });
});

router.post('/create',(req,res)=>{
    let errors=[];
    if(!req.body.title){
        errors.push({message:'Please Fill your titile'});
    }
    if(!req.body.body){
        errors.push({message:'Please Enter Your Description'});
    }
    if(errors.length>0){
        res.render('admin/posts/create',{errors:errors});
    }else{
        let filename='';

        if(!isEmpty(req.files)){
            let file=req.files.file;
            filename=Date.now()+'-'+file.name;
            let dirUploads='./public/uploads/'
            
            file.mv(dirUploads+filename,(err)=>{
                if (err) throw err;
            });
    
        }
        
        
        if(req.body.allowComments){
            allowComments=true;
        }else{
            allowComments=false;
        }
        const newPost=new Post({
        title:req.body.title,
        status:req.body.status,
        allowComments:allowComments,
        body:req.body.body,
        file:filename
    });
    
     
    newPost.save().then(savedPost=>{
        res.redirect('/admin/posts')
    }).catch(error=>{
        console.log("could not poost data due to"+error);
    })

    }

    //console.log(req.body.allowComments); 
})
module.exports=router;