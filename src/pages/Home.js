import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import heroImage from '../assets/images/hero.jpg';
import tear from '../assets/images/tear.svg';
import Offers from '../components/Offers';

//Hero Component
const Hero = ({ setLoginVisible }) => {
	const token = Cookies.get('token');
	const navigate = useNavigate();

	return (
		<>
			<section className="hero">
				<div className="hero-image">
					<img src={heroImage} alt="hero" />
					<img className="hero-tear" src={tear} alt="" />
				</div>

				<div className="card-sell-now">
					<h1>Prêts à faire du tri dans vos placards ?</h1>

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
						Vends maintenant
					</button>

					<p>Découvrir comment ça marche</p>
				</div>
			</section>
		</>
	);
};

//Main Home Content
const Home = ({ setLoginVisible, filterObj, filter, setFilter }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const newFilterObj = [...filterObj];
			const url = `https://site--vinted-backend--gsmxcbzt8tzm.code.run/offer`;
			// const url = `http://localhost:8080/offer`;

			const response = await axios.get(url, { params: newFilterObj[0] });
			const data = response.data;

			setData(data);
			setIsLoading(false);
			setFilter(false);
		};
		fetchData();
	}, [filter, filterObj, setFilter]); //define State for filter

	return (
		<>
			<main>
				<Hero setLoginVisible={setLoginVisible}></Hero>
				<h1 className="title-home-offers">Articles populaires</h1>
				{!isLoading ? (
					<div>
						<section className="home-item-wrapper">
							{data.offers.map((item) => {
								return <Offers key={item._id} item={item}></Offers>;
							})}
						</section>
					</div>
				) : (
					<div></div>
				)}
			</main>
		</>
	);
};

export default Home;
