//this is our server file
const express=require('express');
const app=express();
const path=require('path');
const exphbs=require('express-handlebars');

app.use(express.static(path.join(__dirname,'public')));
//Set View Engine
app.engine('handlebars',exphbs({defaultLayout: 'home'}))
app.set('view engine','handlebars');
//load routes
const home=require('./routes/home');
const admin=require('./routes/admin');
//use routes
app.use('/',home); 
app.use('/admin',admin)
app.listen(4500,()=>{
    console.log(`server is listing on the port 4500`);
})