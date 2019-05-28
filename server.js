const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port= process.env.PORT || 3000;
var app=express();


app.set('view engine','hbs');
app.use((req,res,next) =>{
  var now= new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log+ '\n', (err)=>{
    if(err){
      console.log('error in saving log');
    };
  } )
next();
});

// app.use((req,res,next) =>{
//   res.render('maintenance.hbs');
//
// })
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('year', ()=>{
  return new Date().getFullYear();
  // return 'test';
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});
app.get('/', (req,res) =>{
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name:'Swadhin',
  //   likes:["Guitar",'bodybuilding','nutrition'],
  //   dislikes:['time waste','sweets']
  // })

  res.render('home.hbs', {
    pageTitle:'Home page',
    welcome:'Welcome to the Home page!'
  });
});

app.get('/about', (req,res) =>{
  res.render('about.hbs', {
    pageTitle:'About page'
  });
});

app.get('/bad', (req,res) =>{
  res.send({
    errorMessage:'unable to handle request'
  });
});


app.listen(port, ()=>{
  console.log(`server is up on port ${port}`);
});
