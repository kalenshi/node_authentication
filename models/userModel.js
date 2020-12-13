const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name:{ 
        type:String,
        required:true
    },
    email:{ 
        type:String,
        unique: true,
        dropDups:true,
        required: true
    },
    password:{ 
        type:String,
        required: true
    },
    createdOn:{
        type: Date,
        default: Date.now
    }
});

let  User = mongoose.model('User', userSchema);

module.exports = User;