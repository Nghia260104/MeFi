import mongoose from 'mongoose';

const comicSchema = new mongoose.Schema({
    title: {type: String, required: true},
    cover: {type: String, required: false},
    chapter: {type: [{
        title: {type: String, required: true},
        image: {type: String, required: true},
    }], required: false},
});

export default mongoose.model('Comics', comicSchema);
