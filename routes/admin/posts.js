const express=require('express');
const router=express.Router();


router.all('/*',(req,res,next)=>{
    req.app.locals.layout='admin';
    next();
})

router.get('/',(req,res)=>{
    res.send('it works');
});
router.get('/create',(req,res)=>{
    res.render('admin/posts/create')
});
router.get('/create',(req,res)=>{
    res.send('IT"S a Create page')
})

router.post('/create',(req,res)=>{
    res.send('worked')
})
module.exports=router;