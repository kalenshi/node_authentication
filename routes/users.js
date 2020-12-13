const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Database
const mongoose = require('mongoose');
const User = require('../models/userModel');



//login page
router.get('/login', (req, res)=>{
    res.render('login',{'page': "Login Page"});
});

//register page
router.get('/register', (req, res)=>{
    res.render('register', {page:"Register Page"});
});

router.post('/register', (req, res)=>{
    const{name, email, password, password2} = req.body;
    //Validation
    let errors = [];
    if(!(name && email && password && password2)){
        errors.push({msg:"Please fill in all Fields"});
    }
    //check that password  and password2 are identical
    if(password !== password2){
        errors.push({msg: "Passwords must match"});
    }
    //check password length
    if(password.length < 6){
        errors.push({msg: "Password should be at least 6 characters"});
    }
    if(errors.length){
        res.render('register', {
            errors:errors,
            data:{
                name,
                email,
            }
        });
    }else{
         //check that the provided email isn't already in the system
        User.findOne({email:email})
        .then(user=>{
            errors.push({msg: `The Email is Associated with another Account.`});
        })
        .catch(err=>{
            console.log(`There's An ERROR: ${err}`);
        });
        //store the user in the database
        if(errors.length){
            res.render('register', {
                errors:errors,
                data:{
                    name,
                    email
                }
            });
        }
         bcrypt.genSalt(10)
         .then(salt=>{
            return bcrypt.hash(password, salt);
         })
         .then(hash=>{
            //save the hash to database
            let newUser = User({
                name:name,
                email:email,
                password :hash
            });
            return newUser.save();
         })
         .then(user=>{
             console.log(`User saved to Database Successfully!!!`);
             res.status(200).send(user);
         })
         .catch(err=>{
            console.log(`We have an Error: ${err}`);
         })
        
    }
   
});

module.exports = router;