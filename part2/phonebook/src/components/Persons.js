import React from 'react'

const Persons = ({ personsToDisplay, handleDelete }) => {
    return (
        <>
            <ul>
                {personsToDisplay.map((el) => (
                    <li key={el.name}>
                        {el.name}: {el.phone}
                        <button onClick={() => handleDelete(el)}>delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Persons
