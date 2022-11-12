//static
import logo from '../assets/images/logoVinted.svg';

//methode
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RangeSet from './RangeSet';

const Header = ({ handleToken, setLoginVisible, setSignupVisible, filterObj, setFilterObj, setFilter }) => {
	//body Modal

	const token = Cookies.get('token');
	const [orderPrice, setOrderPrice] = useState(true);
	const [range, setRange] = useState([10, 100]);

	const navigate = useNavigate();

	const handlePriceRange = (values) => {
		setRange(values);
		const newFilterObj = [...filterObj];
		newFilterObj[0].priceMin = range[0];
		newFilterObj[0].priceMax = range[1];

		setFilterObj(newFilterObj);
		setFilter(true);
	};

	const handleFilterPriceOrder = () => {
		setOrderPrice(!orderPrice);
		const order = orderPrice ? 'price-desc' : 'price-asc';
		const newFilterObj = [...filterObj];
		newFilterObj[0].sort = order;
		setFilterObj(newFilterObj);
		setFilter(true);
	};

	const handleFilterTitle = async (title) => {
		const newFilterObj = [...filterObj];
		newFilterObj[0].title = title;

		setFilterObj(newFilterObj);
		setFilter(true);
	};

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
						<div className="nav-search-bar-filter">
							<div className="nav-search-bar">
								<ion-icon name="search-outline"></ion-icon>
								<input
									onChange={(event) => {
										handleFilterTitle(event.target.value);
									}}
									type="text"
									placeholder="Rechercher des articles"
									value={filterObj.title}
								/>
							</div>
							<div className="header-filters">
								<div className="price-sorting">
									<h3>Trier par prix :</h3>
									<div
										onClick={() => {
											handleFilterPriceOrder();
										}}
										className="filter-price"
									>
										<span className={orderPrice ? 'normal' : 'reverse'}>⇣</span>
									</div>
									<h3>Prix entre :</h3>
								</div>
								<div className={'slider-range'}>
									<RangeSet values={range} setValues={setRange} handlePriceRange={handlePriceRange}></RangeSet>
								</div>
							</div>
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
										document.body.className = 'body-modal';
									}}
								>
									S'inscrire
								</button>

								<button
									onClick={() => {
										setLoginVisible(true);
										document.body.className = 'body-modal';
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
									document.body.className = 'body-modal';
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
