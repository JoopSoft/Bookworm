import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

//TODO: add uniqueness and email validations to email field
const shema = new mongoose.Schema({
    email: { type: String, required: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true }
}, { timestamps: true });

shema.methods.isValidPassword = function isValidPassword(password){
    return bcrypt.compareSync(password, this.passwordHash);
}

export default mongoose.model('User', shema);