import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: false},
    googleID: {type: String, required: false},
    profilePhoto: {type: String, required: false},
    DateOfBirth: {type: Date, required: false},
    verified: {type: Boolean, default: false},
    verificationCode: {type: String, required: false},
    verificationCodeExpires: {type: Date, required: false},
});

export default mongoose.model('Users', userSchema);
