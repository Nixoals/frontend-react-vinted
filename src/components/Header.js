import logo from '../assets/images/logoVinted.svg';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Header = ({ handleToken, setLoginVisible, setSignupVisible }) => {
	const token = Cookies.get('token');
	const navigate = useNavigate();
	return (
		<>
			<header>
				<nav className="primary-nav">
					<Link to="/">
						<div>
							<img src={logo} alt="" />
						</div>
					</Link>
					<input type="text" placeholder="Searched item" />

					{token ? (
						<>
							<button
								onClick={() => {
									handleToken(null);
									navigate('/');
								}}
							>
								Deconnexion
							</button>
						</>
					) : (
						<>
							<button
								onClick={() => {
									setSignupVisible(true);
								}}
							>
								S'inscrire
							</button>

							<button
								onClick={() => {
									setLoginVisible(true);
								}}
							>
								Se connecter
							</button>
						</>
					)}

					<button
						onClick={() => {
							if (token) {
								navigate('/sell-items');
							} else {
								setLoginVisible(true);
							}
						}}
					>
						Vendre des articles
					</button>
				</nav>
			</header>
		</>
	);
};

export default Header;
