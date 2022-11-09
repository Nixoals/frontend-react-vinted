import logo from '../assets/images/logoVinted.svg';
import { Link } from 'react-router-dom';

const Header = () => {
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
					<button>S'inscrire</button>
					<button>Se connecter</button>
					<button>Vendre des articles</button>
				</nav>
			</header>
		</>
	);
};

export default Header;
