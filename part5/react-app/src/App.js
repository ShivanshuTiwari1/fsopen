import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import * as blogService from './services/blogs.js';
import LoginForm from './components/LoginForm.js';
import Togglable from './components/Togglable.js';
import BlogForm from './components/BlogForm';
import './index.css';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    
    const blogFormRef = useRef();

    const handleBlogCreate = async (blogObj) => {
        blogFormRef.current.toggleVisibility();
        const newBlog = await blogService.createBlog(blogObj);

        setBlogs(blogs.concat(newBlog));
    };

    const handleLogout = () => {
        setUser(null);
        blogService.setToken(null);
        window.localStorage.removeItem('loggedBlogAppUser');
    };
    useEffect(() => {
        async function tempFunc() {
            const loggedUserJSON =
                window.localStorage.getItem('loggedBlogAppUser');

            if (loggedUserJSON) {
                //Token is present in the browser storage
                blogService.setToken(JSON.parse(loggedUserJSON).token);
                setUser(JSON.parse(loggedUserJSON));
            }
            try {
                const blogs = await blogService.getAll();
                setBlogs(blogs);
            } catch (err) {
                console.log(err);
            }
        }
        tempFunc();
    }, []);
    const renderLoginForm = () => {
        return (<Togglable buttonLabel="Sign In?">
            <LoginForm
                handleLogin={handleLogin}
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
            />
        </Togglable>);
    };
    const renderBlogs = () => {
        return (
            <>
                <p>{user.name} logged in</p>
                <button onClick={handleLogout}>logout</button>

                <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
                    <BlogForm
                        handleBlogCreate={handleBlogCreate}
                    />{' '}
                </Togglable>

                <h2>blogs</h2>
                {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </>
        );
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        const authObj = {
            username: e.target.username.value,
            password: e.target.password.value,
        };
        try {
            const userCredentials = await blogService.login(authObj);
            if (userCredentials.error) {
                throw new Error('Invalid Credentials!');
            }
            setUser(userCredentials);
            blogService.setToken(userCredentials.token);
            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(userCredentials)
            );
        } catch (err) {
            console.log(err);
        }
        setUsername('');
        setPassword('');
    };

    return (
        <div>
            <h1>BlogList - Blog Your Blogs</h1>
            {user === null ? renderLoginForm() : renderBlogs()}
        </div>
    );
};

export default App;
