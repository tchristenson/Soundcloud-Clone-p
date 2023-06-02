import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [alias, setAlias] = useState("");
	const [bio, setBio] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [styleId, setStyleId] = useState(0)
	const [profilePicture, setProfilePicture] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			// console.log('inside handleSubmit on SignupFormModal', username, email, password, alias,
			// bio, firstName, lastName, styleId, profilePicture)
			const data = await dispatch(signUp(username, email, password, alias,
				bio, firstName, lastName, styleId, profilePicture));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-div">
			<h1 className="modalText">Create Your Profile</h1>
			<form className="signup-form" onSubmit={handleSubmit}>
				<ul className="signup-errors">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label className="signup-text">
					<input
						type="text"
						placeholder="Email (required)"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label className="signup-text">
					<input
						type="text"
						placeholder="Username (required)"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label className="signup-text">
					<input
						type="password"
						placeholder="Password (required)"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label className="signup-text">
					<input
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<label className="signup-text">
					<input
						type="text"
						placeholder="First Name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</label>
				<label className="signup-text">
					<input
						type="text"
						placeholder="Last Name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</label>
				<label className="signup-text">
					<input
						type="text"
						placeholder="Alias"
						value={alias}
						onChange={(e) => setAlias(e.target.value)}
					/>
				</label>
				<label className="signup-text">
					<input
						type="textarea"
						placeholder="Bio"
						value={bio}
						onChange={(e) => setBio(e.target.value)}
					/>
				</label>
				<label className="signup-text">
					<input
						type="text"
						placeholder="Profile Picture URL"
						value={profilePicture}
						onChange={(e) => setProfilePicture(e.target.value)}
					/>
				</label>
				<div className="form-input-box">
                <select onChange={(e) => setStyleId(e.target.value)}>
                    <option value='' disabled selected>{'Music Style'}</option>
										<option value={null}>No Style</option>
                    <option value={1}>Reggae</option>
                    <option value={2}>Rock</option>
                    <option value={3}>Punk</option>
                    <option value={4}>Pop</option>
                    <option value={5}>Electronic</option>
                    <option value={6}>Jazz</option>
                    <option value={7}>Blues</option>
                    <option value={8}>Country</option>
                    <option value={9}>Metal</option>
                    <option value={10}>Folk</option>
                    <option value={11}>Funk</option>
                    <option value={12}>Soul</option>
                    <option value={13}>Classical</option>
                </select>
            </div>
				<button className="confirm-signup" type="submit">Sign Up!</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
