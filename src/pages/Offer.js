import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import axios from 'axios';
import Loader from '../components/Loader';

const Offer = ({ setLoginVisible }) => {
	const { id } = useParams();

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();
	const navigate = useNavigate();
	const token = Cookies.get('token');

	useEffect(() => {
		const fetchData = async () => {
			const url = `https://site--vinted-backend--gsmxcbzt8tzm.code.run/offer/${id}`;
			const response = await axios.get(url);
			const data = response.data;
			setData(data);
			setIsLoading(false);
		};
		fetchData();
	}, [id]);
	return !isLoading ? (
		<>
			<div className="single-offer-background">
				<section className="single-offer-wrapper">
					<div className="single-offer-image">
						<img src={data.product_image.secure_url} alt="product"></img>
					</div>

					<div className="single-offer-description">
						<h1>{data.product_price} €</h1>
						<div className="single-offer-description-details">
							{data.product_details.map((detail, index) => {
								const objectKey = Object.keys(detail)[0];

								return (
									<div key={index}>
										<span>{objectKey}</span>
										<span>{detail[objectKey]}</span>
									</div>
								);
							})}
						</div>
						<div className="single-offer-user-wrapper">
							<h1>{data.product_name}</h1>
							<p>{data.product_description}</p>
							<div>
								<div className="single-offer-user">
									<img src={data.owner.account.avatar} alt="user avatar"></img>
									<div>{data.owner.account.username}</div>
								</div>
							</div>
						</div>

						{!data.sold ? (
							<button
								onClick={() => {
									if (token) {
										navigate('/payment', { state: { offerID: id } });
									} else {
										document.body.className = 'body-modal';
										setLoginVisible(true);
									}
								}}
							>
								Acheter
							</button>
						) : (
							<button
								onClick={() => {
									navigate('/');
								}}
								className="product-sold"
							>
								Produit vendu
							</button>
						)}
					</div>
				</section>
			</div>
		</>
	) : (
		<Loader></Loader>
	);
};

export default Offer;
