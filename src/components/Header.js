//static
import logo from '../assets/images/logoVinted.svg';

//methode
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

//Components
import RangeSet from './RangeSet';

const Header = ({ handleToken, setLoginVisible, setSignupVisible, filterObj, setFilterObj, setFilter }) => {
	//check location for displaying filter pannel or not
	const { pathname } = useLocation();
	//Check Authentication
	const token = Cookies.get('token');
	const [orderPrice, setOrderPrice] = useState(true);
	const [range, setRange] = useState([10, 100]);
	const [menuOpen, setMenuOpen] = useState(false);

	const navigate = useNavigate();

	//Change price range to display Offers
	const handlePriceRange = (values) => {
		setRange(values);
		const newFilterObj = [...filterObj];
		newFilterObj[0].priceMin = range[0];
		newFilterObj[0].priceMax = range[1];
		setFilterObj(newFilterObj);
		setFilter(true);
	};

	//Change Offers order depending on price ascending or descending
	const handleFilterPriceOrder = () => {
		setOrderPrice(!orderPrice);
		const order = orderPrice ? 'price-desc' : 'price-asc';
		const newFilterObj = [...filterObj];
		newFilterObj[0].sort = order;
		setFilterObj(newFilterObj);
		setFilter(true);
	};

	//Search items based on their title
	const handleFilterTitle = async (title) => {
		const newFilterObj = [...filterObj];
		newFilterObj[0].title = title;
		setFilterObj(newFilterObj);
		setFilter(true);
	};

	const handleCloseMenu = () => {
		setMenuOpen(false);
	};

	const handleStateMenu = (state) => {
		setMenuOpen(state.isOpen);
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
							<div className={pathname === '/' ? 'header-filters' : 'header-filters-hidden'}>
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
						<div className="burger-menu">
							<div>
								<Menu width={200} isOpen={menuOpen} onStateChange={handleStateMenu} right customBurgerIcon={<ion-icon name="menu-outline"></ion-icon>}>
									<div>
										<div className="menu-item">
											{token ? (
												<>
													<button
														onClick={() => {
															handleCloseMenu();
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
															handleCloseMenu();
															setSignupVisible(true);
															document.body.className = 'body-modal';
														}}
													>
														S'inscrire
													</button>

													<button
														onClick={() => {
															handleCloseMenu();
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
														navigate('/publish');
													} else {
														handleCloseMenu();
														setLoginVisible(true);
														document.body.className = 'body-modal';
													}
												}}
											>
												Vends tes articles
											</button>
										</div>
									</div>
								</Menu>
							</div>
						</div>

						<div className="nav-right-wrapper">
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
										navigate('/publish');
									} else {
										setLoginVisible(true);
										document.body.className = 'body-modal';
									}
								}}
							>
								Vends tes articles
							</button>
						</div>
					</div>
				</nav>
			</header>
		</>
	);
};

export default Header;
