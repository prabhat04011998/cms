//this is our server file
const express=require('express');
const app=express();
const path=require('path');
const exphbs=require('express-handlebars');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const upload=require('express-fileupload');
const Post=require('./models/Post');
const flash=require('connect-flash'); 
const session=require('express-session');
const methodOverride=require('method-override');


mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost/cms').then((db)=>{
    console.log('Monogo connected');
}).catch((error)=>{
    console.log(error);
});



app.use(express.static(path.join(__dirname,'public')));
//Set View Engine

const {select,GenerateDate}=require('./helpers/handlebars-helpers');

app.engine('handlebars',exphbs({defaultLayout: 'home',helpers:{select:select,GenerateDate:GenerateDate}}))
app.set('view engine','handlebars');

// upload middleware
app.use(upload());

//body parser
app.use(bodyParser.urlencoded({extended:true}));   
app.use(bodyParser.json()) ;

//Method override
app.use(methodOverride('_method'));

app.use(session({
    secret:'prabhatsharma',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());

//local variables using middlewares
app.use((req,res,next)=>{
    res.locals.success_message=req.flash('success-message');
    res.locals.error_message=req.flash('error-message');
    next();

})

//load routes
const home=require('./routes/home');
const admin=require('./routes/admin');
const posts=require('./routes/admin/posts');
const category=require('./routes/admin/Categories');

//use routes
app.use('/',home); 
app.use('/admin',admin);
app.use('/admin/posts',posts);
app.use('/admin/categories',category);

app.listen(4500,()=>{
    console.log('server is listening on the posrt 4500');
})