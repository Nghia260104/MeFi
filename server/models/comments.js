import mongoose, {Schema} from 'mongoose';

const commentSchema = new mongoose.Schema({
  name: {type: String, required: true},
  blog: {type: Schema.Types.ObjectId, required: false, ref: 'Blogs'},
  comment: {type: Schema.Types.ObjectId, required: false, ref: 'Comments'},
  createdAt: {type: Date, required: true},
  creator: {type: Schema.Types.ObjectId, required: true, ref: 'Users'},
  likes: {
    type: [Schema.Types.ObjectId],
    required: false,
    default: [],
  },
  content: {type: String, required: true},
});

export default mongoose.model('Comments', commentSchema);
