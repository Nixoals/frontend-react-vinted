import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const Offer = () => {
	const { id } = useParams();

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();

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
							<p>{data.product_details[2].État}</p>
							<div>
								<div className="single-offer-user">
									<img src={data.owner.account.avatar} alt="user avatar"></img>
									<div>{data.owner.account.username}</div>
								</div>
							</div>
						</div>
						<button>Acheter</button>
					</div>
				</section>
			</div>
		</>
	) : (
		<div>...downloading Data</div>
	);
};

export default Offer;
