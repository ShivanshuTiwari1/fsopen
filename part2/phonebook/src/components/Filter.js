import React from 'react'

const Filter = ({ newQuery, handleNewQuery }) => {
    return (
        <>
            Search by name: <input value={newQuery} onChange={handleNewQuery}/>
        </>
    )
}

export default Filter
