import mongoose from 'mongoose';

const vaccineSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    gender: {type: Boolean, required: true},
    prevention: {type: [String], required: false},
    description: {type: [String], required: false},
    caution: {type: String, required: false},
    numberOfInjection: {type: Number, required: true},
    origin: {type: String, required: true},
    location: {type: [String], required: true},
});

export default mongoose.model('Vaccines', vaccineSchema);
