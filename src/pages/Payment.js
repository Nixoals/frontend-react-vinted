import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('pk_test_51M4MCzHTRmDc4m32Tx72yLK6JZzwzCB7neMvSMszsXqKDzjWqgL5nqmkqlFpeSkwVDTSlyjTsdisqMwqLHGs65zZ00hFHW31ME');

const Payment = ({ userId, setLoader }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();
	const location = useLocation();
	const id = location.state?.offerID;
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			if (!id) {
				return null;
			}
			const url = `https://site--vinted-backend--gsmxcbzt8tzm.code.run/offer/${id}`;
			const response = await axios.get(url);
			const data = response.data;

			setData(data);
			setIsLoading(false);

			if (data.sold) {
				navigate('/');
			}
		};
		fetchData();
	}, [id, navigate]);
	return !isLoading ? (
		<>
			<section className="payment-background">
				<div className="payment-card-wrapper">
					<h2>Résumé de la commande</h2>
					<div className="upper-payment-card">
						<div>
							<span>Commande</span>
							<span>{data.product_price} €</span>
						</div>
						<div>
							<span>Frais protection acheteurs</span>
							<span>1.00 €</span>
						</div>
						<div>
							<span>1.00 € Frais de port</span>
							<span>2.00 €</span>
						</div>
					</div>
					<div className="divider"> </div>
					<div className="lower-payment-card">
						<div className="lower-payment-card-total">
							<div>Total</div>
							<div>{Number(data.product_price) + 3} €</div>
						</div>
					</div>
					<div className="strip-element-wrapper">
						<div className="strip-element-resume">
							Il ne vous reste plus qu'un étape pour vous offrir <strong>{data.product_name}</strong>. Vous allez payer <strong>{Number(data.product_price) + 3} €</strong> (frais de protection et frais de port inclus).
						</div>
						<div className="divider"> </div>
						<div className="strip-element">
							<Elements stripe={stripePromise}>
								<CheckoutForm id={id} userId={userId} setLoader={setLoader} />
							</Elements>
						</div>
					</div>
				</div>
			</section>
		</>
	) : (
		<>
			<section className="no-offer-payment-wrapper">
				<div className="no-offer-payment">
					<div>Aucun offre ne correspond à votre recherche</div>
					<button
						onClick={() => {
							navigate('/');
						}}
					>
						Retourner vers la page des offres? Par ici!
					</button>
				</div>
			</section>
		</>
	);
};

export default Payment;
