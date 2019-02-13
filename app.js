//this is our server file
const express=require('express');
const app=express();
const path=require('path');

app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
    res.send('it works')
})
app.listen(4500,()=>{
    console.log(`server is listing on the port 4500`);
})