const baseUrl = '/api/blogs';
const loginUrl = '/api/login'

let token = null;

const setToken = (tokenValue) => {
    token = `bearer ${tokenValue}`
}

const getAll = async () => {
    try {
        const response = await fetch(baseUrl);
        return response.json();
    } catch (err) {
        console.log(err);
    }
};

const login = async (authObj) => {
    const response = await fetch(loginUrl, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(authObj)
    })
    return response.json();
}

const createBlog = async (blogObj) => {
    
    const response = await fetch(baseUrl, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(blogObj)
    })
    return response.json();
}
export { getAll, login, createBlog, setToken };
