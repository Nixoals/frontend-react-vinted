//static
import logo from '../assets/images/logoVinted.svg';

//methode
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Range, getTrackBackground } from 'react-range';

const Header = ({ handleToken, setLoginVisible, setSignupVisible, filterObj, setFilterObj, setFilter }) => {
	const token = Cookies.get('token');
	const [orderPrice, setOrderPrice] = useState(true);
	const [values, setValues] = useState([10, 100]);
	const COLORS = ['#ccc', '#007782', '#ccc'];

	const navigate = useNavigate();

	const handleFilterPrice = () => {
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
									<h3>Trier par prix</h3>
									<div
										onClick={() => {
											handleFilterPrice();
										}}
										className="filter-price"
									>
										<span className={orderPrice ? 'normal' : 'reverse'}>⇣</span>
									</div>
								</div>
								<div className={'slider-range'}>
									<Range
										values={values}
										step={1}
										min={0}
										max={500}
										rtl={false}
										onChange={(values) => {
											setValues(values);
										}}
										renderTrack={({ props, children }) => (
											<div
												onMouseDown={props.onMouseDown}
												onTouchStart={props.onTouchStart}
												style={{
													...props.style,
													height: '36px',
													display: 'flex',
													width: '100%',
												}}
											>
												<div
													ref={props.ref}
													style={{
														height: '5px',
														width: '100%',
														borderRadius: '4px',
														background: getTrackBackground({
															values,
															colors: COLORS,
															min: 0,
															max: 500,
															rtl: false,
														}),
														alignSelf: 'center',
													}}
												>
													{children}
												</div>
											</div>
										)}
										renderThumb={({ index, props, isDragged }) => (
											<div
												{...props}
												style={{
													...props.style,
													height: '15px',
													width: '15px',

													backgroundColor: '#007782',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													boxShadow: '0px 2px 6px #AAA',
													borderRadius: '50%',
												}}
											>
												<div style={{ position: 'absolute', top: '-20px', backgroundColor: '#007782', padding: '5px', outline: 'none' }}>{values[index].toFixed(0)}</div>
												<div
													style={{
														height: '15px',
														width: '15px',
														borderRadius: '50%',
														backgroundColor: isDragged ? '#009782' : '#007782',
													}}
													tabIndex="1"
													index={10}
												></div>
											</div>
										)}
									></Range>
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
