
const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({

    name: {
        type:String,
        require:true
    } ,
    email: {
        unic:true,
        type:String,
        require:true,
        lowwercase:true
    } ,
    password: {
        type:String,
        require:true,
        select: false
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

// reference from above answer
UserSchema.pre('save', async function(next) {

    const rounds = 10;

    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;
    next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;