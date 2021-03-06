import express from 'express'
import Blog from '../models/blog.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken'

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
}

const blogRouter = express.Router();

blogRouter.get('/',  async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1});
    response.json(blogs);
});

blogRouter.post('/',  async (request, response) => {
    const body = request.body;
    
    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    
    if(!decodedToken.id)
    {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }
    
    const user = await User.findById(decodedToken.id)
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save();
    
    response.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body;
    
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    });
    response.json(updatedBlog);
})

export default blogRouter;