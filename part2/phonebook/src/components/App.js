import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import personService from './../services/Person';
import './../index.css';
import Notification from './Notification';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newQuery, setNewQuery] = useState('');
    const [operationStatus, setOperationStatus] = useState(null);

    useEffect(() => {
        personService.getAll().then((data) => setPersons(data));
    }, []);

    let personsToDisplay = persons;

    if (newQuery.length !== 0) {
        let newArr = persons.filter((el) =>
            el.name.toLowerCase().includes(newQuery.toLowerCase())
        );
        personsToDisplay = newArr;
    }
    const handleNewQuery = (e) => {
        setNewQuery(e.target.value);
    };
    const handleName = (e) => {
        setNewName(e.target.value);
    };
    const handlePhone = (e) => {
        setNewPhone(e.target.value);
    };
    const handleAdd = (e) => {
        e.preventDefault();
        let isPresent = false;
        let i = 0;

        for (i = 0; i < persons.length; i++) {
            if (newName.toLowerCase() === persons[i].name.toLowerCase()) {
                isPresent = true;
                break;
            }
        }
        if (isPresent) {
            //Playground
            const decision = window.confirm(
                `${persons[i].name} is already added to phonebook, replace the old number with a new one?`
            );

            if (decision) {
                const updatedContact = { ...persons[i], phone: newPhone };
                personService
                    .update(updatedContact)
                    .then((data) => {
                        //First of all i want to get rid of previous entry
                        setPersons(
                            persons
                                .slice(0, i)
                                .concat(data)
                                .concat(persons.slice(i + 1))
                        );
                        setOperationStatus([
                            `${persons[i].name}'s contact is successfully updated.`,
                            'success',
                        ]);
                        setTimeout(() => {
                            setOperationStatus(null);
                        }, 5000);
                        setNewName('');
                        setNewPhone('');
                    })
                    .catch((err) => {
                        setNewName('');
                        setNewPhone('');
                        console.log(err);
                        setOperationStatus([
                            `Information on ${persons[i].name} has already been removed from the server.`,
                            'fail',
                        ]);
                        setTimeout(() => {
                            setOperationStatus(null);
                        }, 5000);
                        personService.getAll().then((data) => setPersons(data));
                    });
            }
        } else {
            //Person is added
            const newContact = {
                name: newName,
                phone: newPhone,
                id: persons.length + 1,
            };
            personService.create(newContact).then((data) => {
                setOperationStatus([`Added ${newName}`, 'success']);
                setTimeout(() => {
                    setOperationStatus(null);
                }, 5000);
                setNewName('');
                setNewPhone('');
                setPersons(persons.concat(data));
            });
        }
    };
    const handleDelete = (contact) => {
        const decision = window.confirm(
            `Delete ${contact.name}'s contact info?`
        );
        if (decision) {
            personService.deleteContact(contact.id).then((data) => {
                setPersons(persons.filter((el) => el.id !== contact.id));
                setOperationStatus([
                    `${contact.name}'s contact is successfully deleted.`,
                    'success',
                ]);
                setTimeout(() => {
                    setOperationStatus(null);
                }, 5000);
            });
        }
    };
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={operationStatus} />
            <Filter newQuery={newQuery} handleNewQuery={handleNewQuery} />

            <h2>Add a new</h2>
            <PersonForm
                handleAdd={handleAdd}
                newName={newName}
                handleName={handleName}
                newPhone={newPhone}
                handlePhone={handlePhone}
            />
            <h2>Numbers</h2>
            <Persons
                personsToDisplay={personsToDisplay}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default App;
