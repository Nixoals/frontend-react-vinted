import { Link } from 'react-router-dom';

import avatar from '../assets/images/avatar.png';

const Offers = ({ item }) => {
	const { owner, product_details, product_image, product_price, _id } = item;
	// console.log(owner.account.username, owner.account.avatar);

	return (
		<>
			<section className="home-items">
				<div className="offer-title">
					{owner.account.avatar ? <img src={owner.account.avatar} alt="avatar"></img> : <img src={avatar} alt="avatar"></img>}
					<div>{owner.account.username}</div>
				</div>
				<Link to={`/offer/${_id}`}>
					<div className="item-image-product">
						<img src={product_image.secure_url} alt="product"></img>
					</div>
				</Link>

				<div className="item-caption">
					<div className="item-caption-left">
						<div className="price-info">
							<h2>{product_price} €</h2>
							<div className="info-icon">
								<ion-icon name="alert-circle-outline"></ion-icon>
							</div>
						</div>
						<div className="lower-description">
							{product_details[1].TAILLE ? <div>{product_details[1].TAILLE}</div> : null}
							<div>{product_details[0].Marque}</div>
						</div>
					</div>
					<div className="item-caption-right">
						<div className="heart-icon">
							<ion-icon className="heart-icon" name="heart-outline"></ion-icon>
						</div>
						<div className="item-like">{Math.round(Math.random() * 10)}</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Offers;
