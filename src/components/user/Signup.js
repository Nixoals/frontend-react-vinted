import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = ({ handleToken, setSignupVisible, setLoginVisible }) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [newsletter, setNewsletter] = useState(false);
	const [alerte, setAlerte] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async () => {
		try {
			if (!username || !password || !confirmPassword || !email) {
				return setAlerte('Veuillez remplir tout les champs');
			} else if (password !== confirmPassword) {
				return setAlerte('Confirmation de mot de passe différent');
			} else if (username && email && password) {
				const url = 'https://site--vinted-backend--gsmxcbzt8tzm.code.run/user/signup';
				// const url = 'http://localhost:4000/user/signup';
				const data = { username, email, password, newsletter, avatar: 'picture' };

				const response = await axios.post(url, data);
				const token = response.data.token;
				setSignupVisible(false);
				handleToken(token);

				return navigate('/');
			}
		} catch (error) {
			const message = error.response.data.message;

			if (message === 'User already exist') {
				setAlerte('Cet email est déja utilisé');
			}
		}
	};
	return (
		<>
			<div className="user-signup-wrapper">
				<div className="user-signup-form">
					<button
						className="close-button-modal"
						onClick={() => {
							setSignupVisible(false);
						}}
					>
						{/* <ion-icon name="close-circle-outline"></ion-icon> */}X
					</button>
					<h1>S'inscrire</h1>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							handleSubmit();
						}}
					>
						<input
							onChange={(event) => {
								setUsername(event.target.value);
							}}
							type="text"
							value={username}
							placeholder="Nom D'utilisateur"
						/>
						<input
							onChange={(event) => {
								setEmail(event.target.value);
							}}
							type="email"
							value={email}
							placeholder="Email"
						/>
						<input
							onChange={(event) => {
								setPassword(event.target.value);
							}}
							type="password"
							value={password}
							placeholder="Mot de passe"
						/>
						<input
							onChange={(event) => {
								setConfirmPassword(event.target.value);
							}}
							type="password"
							value={confirmPassword}
							placeholder="conrfirmer le mot de passe"
						/>
						<div>
							<input
								onChange={() => {
									setNewsletter(true);
								}}
								type="checkbox"
								defaultChecked={newsletter}
								value={newsletter}
							/>
							<span> S'incrire à notre newsletter</span>
						</div>
						<div>
							<p>En m'inscrivant je confirme avoir lu et accepté les Termes & Conditions et Politique de Confidentialité de Vinted. Je confirme avoir au moins 18 ans.</p>
						</div>
						<div className={alerte ? 'alerte-message' : 'alerte-message-hidden'}>
							<p>{alerte}</p>
						</div>
						<input type="submit" value="S'inscrire" />
					</form>
				</div>
			</div>
		</>
	);
};

export default Signup;
