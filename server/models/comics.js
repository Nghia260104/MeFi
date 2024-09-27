import mongoose from 'mongoose';

const comicSchema = new mongoose.Schema({
    title: {type: String, required: true},
    cover: {type: String, required: false},
    chapter: {type: [{
        title: {type: String},
        image: {type: String},
    }], required: false, default: []},
});

export default mongoose.model('Comics', comicSchema);
