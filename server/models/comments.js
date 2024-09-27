import mongoose, { Schema } from 'mongoose';

const commentSchema = new mongoose.Schema({
    type: {type: Boolean, required: true},
    blog: {type: Schema.Types.ObjectId, required: false, ref: 'Blogs'},
    comment: {type: Schema.Types.ObjectId, required: false, ref: 'Comments'},
    createdAt: {type: Date, required: true},
    creator: {type: Schema.Types.ObjectId, required: true, ref: 'Users'},
    likes: {type: [Schema.Types.ObjectId], required: false, ref: 'Users', default: []},
    comments_list: {type: [Schema.Types.ObjectId], required: false, ref: 'Comments', default: []},
    content: {type: String, required: true},
});

export default mongoose.model('Comments', commentSchema);
