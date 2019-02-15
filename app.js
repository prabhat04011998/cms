//this is our server file
const express=require('express');
const app=express();
const path=require('path');
const exphbs=require('express-handlebars');

app.use(express.static(path.join(__dirname,'public')));
app.engine('handlebars',exphbs({defaultLayout: 'home'}))
app.set('view engine','handlebars');
app.get('/',(req,res)=>{
    res.render('home/index')
})
app.listen(4500,()=>{
    console.log(`server is listing on the port 4500`);
})