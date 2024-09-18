import mongoose, { Schema } from 'mongoose';

const vaccineOfUserSchema = new mongoose.Schema({
    user_id: {type: Schema.Types.ObjectId, required: true, ref: 'Users'},
    vaccine_id: {type: Schema.Types.ObjectId, required: true, ref: 'Vaccines'},
    injection_order: {type: Number, required: true},
    date: {type: Date, required: true},
    location: {type: String, required: true},
});

export default mongoose.model('UsersVaccines', vaccineOfUserSchema);
