const express=require('express');
const app=express();
app.listen(3000);
app.get('/',(req,res)=>{
    res.send('<h1>hello</h1>')
})
app.get('/about',(req,res)=>{
    res.sendFile('./views/aboutus.html',{root:__dirname})
})
//redirect
app.get('/about-us',(req,res)=>{
    res.redirect('/about');
})
app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html',{root:__dirname})
})