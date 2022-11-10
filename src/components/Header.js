import logo from '../assets/images/logoVinted.svg';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Header = ({ handleToken }) => {
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
							<Link to="/signup">
								<button>S'inscrire</button>
							</Link>
							<Link to="/login">
								<button>Se connecter</button>
							</Link>
						</>
					)}

					<Link to={token ? '/sell-items' : '/login'}>
						<button>Vendre des articles</button>
					</Link>
				</nav>
			</header>
		</>
	);
};

export default Header;
