import React from 'react';

/**
 * COMPONENT
 */

const SignUpForm = (props) => {
	const { name, displayName, handleSubmit, error } = props;

	return (
		<div id="signUp">
			<form onSubmit={handleSubmit} name={name}>
				<div>
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
					<label htmlFor="fullName">
						<small>Full Name</small>
					</label>
					<input name="fullName" type="text" />
					<label htmlFor="email">
						<small>Email</small>
					</label>
					<input name="email" type="text" />
					<label htmlFor="address">
						Address
					</label>
					<input name="address" type="text" />
					<label htmlFor="dob">
						Date of Birth
					</label>
					<input name="dob" type="date" />
				</div>
				<div>
					<a href="/home">
						<button type="submit">{displayName}</button>
					</a>
				</div>
				{error && error.response && <div> {error.response.data} </div>}
			</form>
		</div>
	);
};

export default SignUpForm;
