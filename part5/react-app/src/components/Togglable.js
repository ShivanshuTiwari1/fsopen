import propTypes from 'prop-types';
import React, { useState, useImperativeHandle } from 'react'


const Togglable = React.forwardRef((props, ref) => {
    const [loginVisible, setLoginVisible] = useState(false);
    
    const toggleVisibility = () => setLoginVisible(!loginVisible)
    
    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })
    
    const showWhenVisible = { display: loginVisible ? "" : "none"}
    const hideWhenVisible = { display: loginVisible ? "none" : ""}
    return (
        <>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
        </>
        
    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonLabel: propTypes.string.isRequired
}

export default Togglable
