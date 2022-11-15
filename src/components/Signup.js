import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = ({ handleToken, setSignupVisible, setLoginVisible }) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [newsletter, setNewsletter] = useState(false);
	const [confirmTerms, setConfirmTerms] = useState(false);
	const [alerte, setAlerte] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async () => {
		console.log(confirmTerms);
		try {
			if (!username || !password || !confirmPassword || !email) {
				return setAlerte('Veuillez remplir tout les champs');
			} else if (!confirmTerms) {
				return setAlerte("Veuillez accepter les conditions d'utilisation");
			} else if (password !== confirmPassword) {
				return setAlerte('Confirmation de mot de passe différent');
			} else if (username && email && password) {
				const url = 'https://site--vinted-backend--gsmxcbzt8tzm.code.run/user/signup';
				// const url = 'http://localhost:4000/user/signup';
				const data = { username, email, password, newsletter, avatar: 'picture' };

				const response = await axios.post(url, data);
				const token = response.data.token;
				const id = response.data._id;
				document.body.classList.toggle('body-modal');
				setSignupVisible(false);
				handleToken(token, id);

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
							document.body.classList.toggle('body-modal');
						}}
					>
						{/* <ion-icon name="close-circle-outline"></ion-icon> */}X
					</button>
					<h1>Inscrits-toi avec ton email</h1>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							handleSubmit();
						}}
					>
						<div>
							<input
								onChange={(event) => {
									setUsername(event.target.value);
								}}
								type="text"
								value={username}
								placeholder="Nom d'utilisateur"
							/>
						</div>

						<div>
							<input
								onChange={(event) => {
									setEmail(event.target.value);
								}}
								type="email"
								value={email}
								placeholder="Email"
							/>
						</div>
						<div>
							<input
								onChange={(event) => {
									setPassword(event.target.value);
								}}
								type="password"
								value={password}
								placeholder="Mot de passe"
							/>
						</div>
						<div>
							<input
								onChange={(event) => {
									setConfirmPassword(event.target.value);
								}}
								type="password"
								value={confirmPassword}
								placeholder="confirmer le mot de passe"
							/>
						</div>
						<div className="user-singup-terms">
							<input
								onChange={() => {
									setNewsletter(true);
								}}
								type="checkbox"
								defaultChecked={newsletter}
								value={newsletter}
							/>
							<p> Je souhaite recevoir par e-mail des offres personnalisées et les dernières mises à jour de Vinted. </p>
						</div>
						<div className="user-singup-terms">
							<input
								onChange={() => {
									setConfirmTerms(true);
								}}
								type="checkbox"
								defaultChecked={confirmTerms}
								value={confirmTerms}
							/>
							<p>En t'inscrivant tu confirmes avoir lu et accepté les Termes & Conditions et Politique de Confidentialité de Vinted. Je confirme avoir au moins 18 ans.</p>
						</div>
						<div className={alerte ? 'alerte-message' : 'alerte-message-hidden'}>
							<p>{alerte}</p>
						</div>
						<input className="modal-submit-button" type="submit" value="Continuer" />
					</form>
				</div>
			</div>
		</>
	);
};

export default Signup;
