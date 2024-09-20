import mongoose from 'mongoose';

const comicSchema = new mongoose.Schema({
    image: {type: String, required: true},
    chapter: {type: Number, required: true},
});

export default mongoose.model('Comics', comicSchema);
