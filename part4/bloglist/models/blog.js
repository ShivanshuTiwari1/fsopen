import Mongoose from 'mongoose';

const blogSchema = new Mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Blog = Mongoose.model('Blog', blogSchema);

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export default Blog;