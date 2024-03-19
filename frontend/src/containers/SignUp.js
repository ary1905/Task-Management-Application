import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import './CSS/SignUp/signUp.css';
import axios from 'axios'


function SignUp({ signup, isAuthenticated }) {
	const [accountCreated, setAccountCreated] = useState(false);
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		re_password: ''
	});

	const { first_name, last_name, email, password, re_password } = formData;

	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		if (password === re_password) {
			signup(first_name, last_name, email, password, re_password);
			setAccountCreated(true);
		}
	};

	const continueWithGoogle = async () => {
		try {
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=http://localhost:8000`)

			window.location.replace(res.data.authorization_url);
		} catch (err) {

		}
	};

	if (isAuthenticated) {
		return <Navigate to="/"></Navigate>
	}

	if (accountCreated) {
		return <Navigate to="/login"></Navigate>
	}

	return (
		<div className='signUpPage'>
			<div className="signUpContainer">
				<div className="signUpContent" style={{ gridArea: 'signUpContent' }}>
					<div className="signUpHead" style={{ gridArea: 'signUpHead' }}>
						<div className="signUpHead1">
							<h1 className='signUpHeadTxt1'>
								Sign Up for TaskHub
							</h1>
							<h5 className='signUpHeadTxt2'>
								Create an Account.
							</h5>
						</div>
					</div>
					<form onSubmit={e => onSubmit(e)} className='my-4' style={{ gridArea: 'signUpIp' }}>
						<div className="signUpIp" >
							<input type="text" name='first_name'
								value={first_name} required className='signUpName'
								onChange={e => onChange(e)} placeholder='First Name'
							/>
						</div>
						<br />
						<div className="signUpIp" >
							<input type="text" name='last_name'
								value={last_name} required className='signUpName'
								onChange={e => onChange(e)} placeholder='Last Name'
							/>
						</div>
						<br />
						<div className="signUpIp" >
							<input type="email" name="email" required className='signUpEmail' value={email}
								onChange={e => onChange(e)} placeholder='Email'
							/>
						</div>
						<br />
						<div className="signUpIp">
							<input type="password" name="password" required className='signUpPass' value={password}
								onChange={e => onChange(e)} placeholder='Password'
							/>
						</div>
						<br />
						<div className="signUpIp">
							<input type="password" name="re_password" required className='signUpRePass' value={re_password}
								onChange={e => onChange(e)} placeholder='Confirm Password'
							/>
						</div>
						<div className="signUpBtn my-3">
							<button className='signUpBtn1' type='submit'>Register</button>
						</div>
					</form>

					<h5 className='signUpMid' style={{ gridArea: 'signUpMid' }}>OR</h5>

					<div className="signUpLink2" style={{ gridArea: 'signUpLink2' }}>
						<button className='signUpBtn3' type='submit' onClick={continueWithGoogle}>
							Continue With Google
						</button>
					</div>

					<div className="signUpLink1" style={{ gridArea: 'signUpLink1' }}>
						<p className='signUpSubs'>Already have an Account?</p>
						<Link className='signUpBtn2' to='/login'>Login</Link>
					</div>

				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(SignUp);
