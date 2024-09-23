import mongoose from 'mongoose';

const vaccineSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    prevention: {type: [String], required: false},
    description: {type: [String], required: false},
    caution: {type: String, required: false},
    numberOfInjection: {type: Number, required: false},
    origin: {type: String, required: false},
    location: {type: [String], required: false},
});

export default mongoose.model('Vaccines', vaccineSchema);
