import React from 'react'
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword}) => {
    return (
        <form onSubmit={handleLogin}>
                <label htmlFor="username">
                    username:{' '}
                    <input
                        required
                        type="text"
                        id="username"
                        value={username}
                        name="username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </label>
                <label htmlFor="pass">
                    password:{' '}
                    <input
                        required
                        type="password"
                        id="pass"
                        value={password}
                        name="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </label>
                <button type="submit">Sign In!</button>
            </form>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

export default LoginForm
