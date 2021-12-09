import React from 'react';


/**
 * COMPONENT
 */

const SignUpForm = (props) => {
	const { name, displayName, handleSubmit, error } = props;

	return (
		<div>
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
						<text>Address</text>
					</label>
					<input name="address" type="text" />
					<label htmlFor="dob">
						<text>Date of Birth</text>
					</label>
					<input name="dob" type="date" />
				</div>
				<div>
					<button type="submit">{displayName}</button>
				</div>
				{error && error.response && <div> {error.response.data} </div>}
			</form>
		</div>
	);
};

export default SignUpForm;