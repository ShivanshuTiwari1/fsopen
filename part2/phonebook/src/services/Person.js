const getAll = () => {
    return fetch('http://localhost:3001/persons').then((res) => res.json());
};

const create = (personObj) => {
    return fetch('http://localhost:3001/persons', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(personObj),
    }).then((res) => res.json());
};

const deleteContact = (id) => {
    return fetch(`http://localhost:3001/persons/${id}`, {
                method: 'DELETE',
            }).then(res =>res.json())
}

const update = (updatedContact) => {
    return fetch(`http://localhost:3001/persons/${updatedContact.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedContact),
    }).then(res => {
        if(!res.ok)
        {
            throw new Error(`Request Failed. Status: ${res.status}`);
        }
        return res.json()
    })
}
export default {
    getAll,
    create,
    deleteContact,
    update,
};
