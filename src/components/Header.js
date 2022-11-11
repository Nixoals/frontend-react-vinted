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
					<div className="primary-nav-left">
						<Link to="/">
							<div className="logo">
								<img src={logo} alt="" />
							</div>
						</Link>
						<div className="nav-search-bar">
							<ion-icon name="search-outline"></ion-icon>
							<input type="text" placeholder="Rechercher des articles" />
						</div>
					</div>
					<div className="primary-nav-right">
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
							Vends tes articles
						</button>
					</div>
				</nav>
			</header>
		</>
	);
};

export default Header;
