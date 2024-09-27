import mongoose, { Schema } from 'mongoose';

const blogSchema = new mongoose.Schema({
    createdAt: {type: Date, required: true},
    creator: {type: Schema.Types.ObjectId, required: true, ref: 'Users'},
    likes: {type: [Schema.Types.ObjectId], required: false, ref: 'Users', default: []},
    comments_list: {type: [Schema.Types.ObjectId], required: false, ref: 'Comments', default: []},
    content: {type: String, required: true},
});

export default mongoose.model('Blogs', blogSchema);
