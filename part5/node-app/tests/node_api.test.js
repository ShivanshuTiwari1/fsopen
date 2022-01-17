import Mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import Blog from '../models/blog.js';

const initialBlogs = [
    {
        title: 'Title 1',
        author: 'Author 1',
        url: 'Url 1',
        likes: 1,
    },
    {
        title: 'Title 2',
        author: 'Author 2',
        url: 'Url 2',
        likes: 2,
    },
];
beforeEach(async () => {
    await Blog.deleteMany({});
    let noteObject = new Blog(initialBlogs[0]);
    await noteObject.save();
    noteObject = new Blog(initialBlogs[1]);
    await noteObject.save();
}, 100000);

const api = supertest(app);

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'This_is_a_new_title',
        author: 'MewAuthor',
        url: 'Da u-r-l',
        likes: 885,
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    const contents = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(contents).toContain('This_is_a_new_title');
});

test('blogs are of expected length & returned as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(initialBlogs.length);
}, 100000);

afterAll(() => {
    Mongoose.connection.close();
});
