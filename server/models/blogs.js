import mongoose, { Schema } from 'mongoose';

const blogSchema = new mongoose.Schema({
    gender: {type: Boolean, required: true},
    createdAt: {type: Date, required: true},
    creator: {type: Schema.Types.ObjectId, required: true, ref: 'Users'},
    likes: {type: [Schema.Types.ObjectId], required: false, ref: 'Users'},
    comments_list: {type: [Schema.Types.ObjectId], required: false, ref: 'Comments'},
});

export default mongoose.model('Blogs', blogSchema);
