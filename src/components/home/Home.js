import heroImage from '../../assets/images/hero.jpg';
import tear from '../../assets/images/tear.svg';
import axios from 'axios';

import { useEffect, useState } from 'react';
import Offers from './Offers';

const Hero = () => {
	return (
		<>
			<section className="hero">
				<img src={heroImage} alt="hero" />
				<div>
					<img className="hero-tear" src={tear} alt="" />
				</div>
				<div className="card-sell-now">
					<h1>Prêts à faire du tri dans vos placards ?</h1>
					<button>Vends maintenant</button>
					<p>Découvrir comment ça marche</p>
				</div>
			</section>
		</>
	);
};

const Home = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get('https://site--vinted-backend--gsmxcbzt8tzm.code.run/offer');
			const data = response.data;
			setData(data);
			setIsLoading(false);
		};
		fetchData();
	}, []);
	return !isLoading ? (
		<>
			<main>
				<Hero></Hero>
				<h1>Articles populaires</h1>
				<section className="home-item-wrapper">
					{data.offers.map((item) => {
						return <Offers key={item._id} item={item}></Offers>;
					})}
				</section>
			</main>
		</>
	) : (
		<div>...downloading</div>
	);
};

export default Home;
