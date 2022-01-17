import React, { useState } from 'react'

const BlogForm = ({ handleBlogCreate }) => {
    
    
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [likes, setLikes] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const blogObj = {
            title: e.target.title.value,
            author: e.target.author.value,
            url: e.target.url.value,
            likes: e.target.likes.value,
        };

        handleBlogCreate(blogObj);
        setTitle('');
        setAuthor('');
        setUrl('');
        setLikes('');
    }
     const numericInput = (e) => {
        let isInt = true;
        if (isNaN(e.target.value)) {
            isInt = false;
        }
        else {
            let x;
            x = parseFloat(e.target.value);
            isInt = (x | 0) === x;
        }
        if(isInt)
            setLikes(e.target.value);
        else
            alert('Only Non negative integers are allowed.')
    }
    
    return (
        <form onSubmit={handleSubmit}>
                    <label htmlFor="title">
                        title:{' '}
                        <input
                            required
                            type="text"
                            id="title"
                            value={title}
                            name="title"
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                    </label>
                    <label htmlFor="author">
                        author:{' '}
                        <input
                            required
                            type="text"
                            id="author"
                            value={author}
                            name="author"
                            onChange={(e) => {
                                setAuthor(e.target.value);
                            }}
                        />
                    </label>
                    <label htmlFor="url">
                        url:{' '}
                        <input
                            required
                            type="text"
                            id="url"
                            value={url}
                            name="url"
                            onChange={(e) => {
                                setUrl(e.target.value);
                            }}
                        />
                    </label>
                    <label htmlFor="likes">
                        likes:{' '}
                        <input
                            required
                            type="text"
                            id="likes"
                            value={likes}
                            name="likes"
                            onChange={numericInput}
                        />
                    </label>
                    <button type="submit">Submit!</button>
                </form>
    )
}

export default BlogForm
