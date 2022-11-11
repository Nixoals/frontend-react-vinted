import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const Login = ({ handleToken, setLoginVisible, setSignupVisible }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [alerte, setAlerte] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async () => {
		try {
			const url = 'https://site--vinted-backend--gsmxcbzt8tzm.code.run/user/login';
			const data = { email, password };
			const response = await axios.post(url, data);

			const token = response.data.token;
			handleToken(token);
			setLoginVisible(false);
			navigate('/');
		} catch (error) {
			setAlerte(true);
			console.log(error.message);
		}
	};
	return (
		<>
			<div className="user-signup-wrapper">
				<div className="login-user-form">
					<h1>Se connecter</h1>
					<button
						className="close-button-modal"
						onClick={() => {
							setLoginVisible(false);
						}}
					>
						{/* <ion-icon name="close-circle-outline"></ion-icon> */}X
					</button>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							handleSubmit();
						}}
					>
						<div>
							<input
								onChange={(event) => {
									setEmail(event.target.value);
								}}
								type="text"
								placeholder="Adresse email"
								value={email}
							/>
						</div>
						<div>
							<input
								onChange={(event) => {
									setPassword(event.target.value);
								}}
								type="password"
								placeholder="Mot de passe"
								value={password}
							/>
						</div>
						<div className={alerte ? 'alerte-message' : 'alerte-message-hidden'}>
							<p>L'adresse email ou le mot de passe est incorrect</p>
						</div>
						<input type="submit" value="Se connecter" />

						<div
							style={{ cursor: 'pointer' }}
							onClick={() => {
								setLoginVisible(false);
								setSignupVisible(true);
							}}
						>
							Pas encore de compte ? Inscris-toi !
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;