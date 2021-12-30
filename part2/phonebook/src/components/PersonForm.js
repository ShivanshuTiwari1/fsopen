import React from 'react'

const PersonForm = ({ handleAdd, newName, handleName, newPhone, handlePhone}) => {
    return (
        <>
            <form onSubmit={handleAdd}>
                <div>
                    name: <input value={newName} onChange={handleName} required/>
                </div>
                <div>
                    phone: <input value={newPhone} onChange={handlePhone} required/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            
        </>
    )
}

export default PersonForm
