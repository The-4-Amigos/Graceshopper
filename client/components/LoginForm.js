import React from 'react';

/**
 * COMPONENT
 */

const LoginForm = (props) => {
	const { name, displayName, handleSubmit, error } = props;

	return (
		<div id='loggin'>
			<form onSubmit={handleSubmit} name={name}>
				<div id='userInfo'>
					<label htmlFor="username">
						<small>Username</small>
					</label>
					<input name="username" type="text" />
				</div>
				<div>
					<label htmlFor="password">
						<small>Password</small>
					</label>
					<input name="password" type="password" />
				</div>
				<div>
					<a href="/">
						<button type="submit">{displayName}</button>
					</a>
				</div>
				{error && error.response && <div> {error.response.data} </div>}
			</form>
		</div>
	);
};

export default LoginForm;
