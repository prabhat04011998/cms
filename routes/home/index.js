const express=require('express');
const router=express.Router();
const Post=require('../../models/Post');
const Category=require('../../models/Category');
var flash = require('connect-flash');
const User = require('../../models/User');
const bcrypt=require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


router.all('/*',(req,res,next)=>{
    req.app.locals.layout='home';
    next();
})


router.get('/',(req,res)=>{
    Post.find({}).then(posts=>{
        Category.find({}).then(categories=>{

        res.render('home/index',{posts:posts,categories:categories});

        })
    }).catch(error=>{
        console.log(err);
    })

    
    
})
router.get('/about',(req,res)=>{
    res.render('home/about')
})
router.get('/login',(req,res)=>{
    res.render('home/login')
})

// APP LOGIN 
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/admin',
        failureRedirect:'/login',
        failureFlash:true,
    })(req,res,next);
})
router.get('/register',(req,res)=>{
    res.render('home/register')
})
router.post('/register',(req,res)=>{


    let errors=[];
    if(!req.body.firstName){
        errors.push({message:'Please Fill your First Name'});
    }
    if(!req.body.lastName){
        errors.push({message:'Please Enter Your Last Name'});
    }
    if(!req.body.email){
        errors.push({message:'please Enter Valid E-mail'});
    }
    if(req.body.password !== req.body.passwordConfirm){
        errors.push({message:'Password is not matched'});

    }
    if(errors.length>0){
        res.render('home/register',{
            errors:errors,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email : req.body.email,
            password : req.body.password,
        });
    }else{

        User.findOne({email:req.body.email}).then(user=>{
            if(!user){
                const newUser=new User({
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    email : req.body.email,
                    password : req.body.password,
            
                })
        
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        newUser.password=hash;
                        newUser.save().then(savedUser=>{
                            req.flash('success_message','Successfully Registered Please Login');    
                            res.redirect('/login');
                        });
                
                    })
                })

            }else{
                req.flash('error_message','E-mail already in use! Please Login');
                res.redirect('/login');
            }

        });

        
        
    }
})

router.get('/post/:id',(req,res)=>{
    Post.findOne({_id:req.params.id}).then(post=>{
        Category.find({}).then(categories=>{
            res.render('home/post',{post:post,categories:categories});

        })
        
    });
})
module.exports = router;
