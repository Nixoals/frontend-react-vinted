import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Cookies from 'js-cookie';

import axios from 'axios';

const CheckoutForm = ({ id }) => {
	const stripe = useStripe();
	const elements = useElements();
	const token = Cookies.get('token');
	const offerID = id;
	const [completed, setCompleted] = useState(false);

	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	const handleSubmitForm = async (event) => {
		event.preventDefault();

		const cardElement = elements.getElement(CardElement);

		const stripeResponse = await stripe.createToken(cardElement, {
			name: "person's name",
		});
		console.log(stripeResponse);
		const stripeToken = stripeResponse.token.id;
		const data = {
			id: `${offerID}`,
			stripeToken,
		};

		const response = await axios.post('http://localhost:8080/pay', data, config);
		console.log(response.data.status, response.data.offer);

		if (response.data.status === 'succeeded') {
			setCompleted(true);
		}
	};
	return (
		<>
			{!completed ? (
				<form onSubmit={handleSubmitForm}>
					<CardElement className="card-number"> </CardElement>
					<button className="pay-button" type="submit">
						Pay
					</button>
				</form>
			) : (
				<span>payment effectué</span>
			)}
		</>
	);
};

export default CheckoutForm;
