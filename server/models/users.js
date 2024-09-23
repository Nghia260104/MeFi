import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, index: true},
    password: {type: String, required: false},
    profilePhoto: {type: Number, default: 1},
    DateOfBirth: {type: Date, required: false},
    gender: {type: Boolean, required: false},
    period_start: {type: Date, required: false},
    period_end: {type: Date, required: false},
    period_type: {type: String, required: false},
    verified: {type: Boolean, default: false},
    verificationCode: {type: String, required: false},
    verificationCodeExpires: {type: Date, required: false},
    resetPassword: {type: Boolean, required: false, default: false},
});

export default mongoose.model('Users', userSchema);
