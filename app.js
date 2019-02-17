//this is our server file
const express=require('express');
const app=express();
const path=require('path');
const exphbs=require('express-handlebars');
const mongoose=require('mongoose');


mongoose.connect('mongodb://localhost/cms').then((db)=>{
    console.log('Monogo connected');
}).catch((error)=>{
    console.log(error);
});



app.use(express.static(path.join(__dirname,'public')));
//Set View Engine
app.engine('handlebars',exphbs({defaultLayout: 'home'}))
app.set('view engine','handlebars');

//load routes
const home=require('./routes/home');
const admin=require('./routes/admin');
const posts=require('./routes/admin/posts');

//use routes
app.use('/',home); 
app.use('/admin',admin);
app.use('/admin/posts',posts);
app.listen(4500,()=>{
    console.log(`server is listing on the port 4500`);
})