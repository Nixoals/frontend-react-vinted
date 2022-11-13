import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';

const Publish = () => {
	const {
		register,
		handleSubmit,
		// reset,
		// formState,
		// formState: { errors },
	} = useForm();

	const [loadedImage, setLoadedImage] = useState([]);

	//Load Image
	const handleImage = (file) => {
		const newLoadedImgae = [...loadedImage];
		newLoadedImgae.push(URL.createObjectURL(file));
		setLoadedImage(newLoadedImgae);
	};
	//Publish Offer
	const handleSubmitOffer = async (data) => {
		let formData = new FormData();
		console.log(data.file);
		formData.append('picture', data.file[0]);
		formData.append('title', data.title);
		formData.append('description', data.description);
		formData.append('brand', data.brand);
		formData.append('size', data.size);
		formData.append('color', data.color);
		formData.append('city', data.city);
		formData.append('price', data.price);
		formData.append('condition', data.condition);
		// console.log(data.file[0]);
		const token = Cookies.get('token');
		const config = {
			headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
		};

		const url = 'https://site--vinted-backend--gsmxcbzt8tzm.code.run/offer/publish';
		// const url = 'http://localhost:8080/offer/publish';

		const response = await axios.post(url, formData, config);
		console.log(response);
	};

	return (
		<>
			<div className="background-publish-wrapper">
				<section className="publish-wrapper">
					<h1>Vends ton article</h1>
					<div className="upload-picture-container">
						<div className={loadedImage.length === 0 ? 'upload-picture-dashed' : 'upload-picture-dashed-flex-start'}>
							<label className={loadedImage.length === 0 ? 'upload-button' : 'upload-button-hidden'}>
								<input
									type="file"
									{...register('file', {
										onChange: (event) => {
											handleImage(event.target.files[0]);
										},
									})}
									placeholder="Ajouter une photo"
								/>
								<span>+</span>
								<span>Ajouter une photo</span>
							</label>

							{loadedImage ? (
								<>
									{loadedImage.map((picture, index) => {
										if (index < 1) {
											return (
												<div key={index} className="uploaded-picture-wrapper">
													<img src={picture} alt={picture}></img>
													<button
														onClick={() => {
															setLoadedImage([]);
														}}
														className="suppress-button-image"
													>
														X
													</button>
												</div>
											);
										} else {
											return null;
										}
									})}
								</>
							) : (
								<></>
							)}
						</div>
					</div>
					<form onSubmit={handleSubmit(handleSubmitOffer)}>
						<div className="offer-container">
							<div>
								<h2>Titre</h2>
								<input {...register('title')} type="text" placeholder="ex: Chemise Sézane verte" />
							</div>
							<div>
								<h2>Décris ton article</h2>
								<textarea {...register('description')} type="text" rows={5} placeholder="ex: porté quelquefois, taille correctement" />
							</div>
						</div>
						<div className="offer-container">
							<div>
								<h2>Marque</h2>
								<input {...register('brand')} type="text" placeholder="ex: Zara" />
							</div>
							<div>
								<h2>Taille</h2>
								<input {...register('size')} type="text" placeholder="ex: L/40/12" />
							</div>
							<div>
								<h2>Couleur</h2>
								<input {...register('color')} type="text" placeholder="ex: Fushia" />
							</div>
							<div>
								<h2>Etat</h2>
								<input {...register('condition')} type="text" placeholder="ex: Neuf avec étiquette" />
							</div>
							<div>
								<h2>Lieu</h2>
								<input {...register('city')} type="text" placeholder="ex: Paris" />
							</div>
						</div>
						<div className="price-offer-container">
							<div>
								<h2>Prix</h2>
								<input {...register('price')} type="number" placeholder="0,00 €" />
							</div>
							<div className="exchange-checkbox">
								<div>
									<input defaultChecked={false} type="checkbox" />
									<h2>Je suis intéressé(e) par les échanges</h2>
								</div>
							</div>
						</div>
						<div className="submit-offer">
							<input type="submit" value="Ajouter" />
						</div>
					</form>
				</section>
			</div>
		</>
	);
};

export default Publish;
