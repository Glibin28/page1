const express=require('express')
const user=express.Router()
const username="glibin"
const password="glibin@28"

user.get('/',(req,res)=>{
    if (req.session.user) {
        res.render('home')
    }else{
        if(req.session.passwordwrong){
            res.render('login',{msg:'Invalid cendeidatal'})
            req.session.passwordwrong=false
            }else{
                res.render('login')
            }
    }
 })

user.post('/verify',(req,res)=>{

    console.log(req.body);
    if(req.body.username===username&&req.body.password===password){
        req.session.user=req.body.username;
        res.redirect('home')
    }
    else{
          req.session.passwordwrong=true  
          res.redirect('/')    
    }
})
user.get('/home',(req,res)=>{
    if (req.session.user) {
        res.render('home')
    }else{
        if(req.session.passwordwrong){
            req.session.passwordwrong=false
        res.render('login',{msg:'Invalid cendeidatal'})
        }else{
            res.render('login')
        }
    }
})
// .........................logout..........................................

user.get('/logout',(req,res)=>{
    req.session.destroy()
    res.render('login',{msg:"logged out"})
})

module.exports=user