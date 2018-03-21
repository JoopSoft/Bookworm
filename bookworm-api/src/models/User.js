import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

//TODO: add uniqueness and email validations to email field
const shema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        lowercase: true, 
        index: true, 
        unique: true 
    },
    passwordHash: { 
        type: String, 
        required: true 
    },
    confirmed: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true });

shema.methods.isValidPassword = function isValidPassword(password){
    return bcrypt.compareSync(password, this.passwordHash);
};

shema.methods.setPassword = function setPassword(password){
    this.passwordHash = bcrypt.hashSync(password, 10);
};

shema.methods.generateJWT = function generateJWT() {
    return jwt.sign(
        {
            email: this.email
        },
        process.env.JWT_SECRET
    )
};

shema.methods.toAuthJSON = function toAuthJSON() {
    return {
        email: this.email,
        confirmed: this.confirmed,
        token: this.generateJWT()
    }
};

shema.plugin(uniqueValidator, { message: 'This email is already taken' });

export default mongoose.model('User', shema);