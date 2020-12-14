
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//User model
const User = require('../models/userModel');


module.exports = passport =>{
    passport.use(
      new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
          //match user
          User.findOne({email})
          .then(user=>{
              if(!user){
                  return done(null, false, {message: `That Email is not Registered`});
              }else{
                  //Match Password
                  bcrypt.compare(password, user.password)
                  .then(isMatch=>{
                      if(isMatch){
                          return done(null,user);
                      }
                      else{
                          return done(null, false, {message: `Password Incorrect`});
                      }
                  })
                  .catch(err=>{
                    console.log(`Error with comparing passwords`);
                  });
              }
          })
          .catch(err=>{
              console.log(`Error Getting user`)
          });
      })  
    );

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, user)=>{
            done(err, user);
        });
    });
}