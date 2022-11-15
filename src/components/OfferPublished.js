import { useNavigate } from 'react-router-dom';

const OfferPublished = ({ setPublishedOffer }) => {
	const navigate = useNavigate();
	return (
		<>
			<div className="published-offer-wrapper">
				<div className="published-offer">
					<button
						className="close-button-modal"
						onClick={() => {
							setPublishedOffer(false);
							document.body.classList.toggle('body-modal');
							navigate('/');
						}}
					>
						X
					</button>
					<div>Félicitation vous venez de bublier une offre</div>
				</div>
			</div>
		</>
	);
};

export default OfferPublished;
