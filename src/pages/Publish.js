import { useState, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useDropzone } from 'react-dropzone';

const Publish = () => {
	const navigate = useNavigate();

	const [loadedImage, setLoadedImage] = useState([]);
	const [pictures, setPictures] = useState([]);
	const { register, handleSubmit } = useForm();

	const onDrop = useCallback(
		(acceptedFiles) => {
			if (pictures.length < 3) {
				const newLoadedImgae = [...loadedImage];
				newLoadedImgae.push(URL.createObjectURL(acceptedFiles[0]));
				setLoadedImage(newLoadedImgae);
				const newPicture = [...pictures];
				newPicture.push(acceptedFiles);
				setPictures(newPicture);
			}
		},
		[loadedImage, pictures]
	);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	const files = loadedImage.map((file, index) => {
		if (index < 3) {
			return (
				<div className="file-names-upload-li" key={index}>
					<li>{`image ${index + 1}`}</li>
					<button
						onClick={() => {
							const removeLoadedImage = [...loadedImage];
							removeLoadedImage.splice(index, 1);

							const removePicture = [...pictures];
							removePicture.splice(index, 1);

							setLoadedImage(removeLoadedImage);
							setPictures(removePicture);
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
	});

	const handleSubmitOffer = async (data) => {
		try {
			let formData = new FormData();
			console.log(pictures[0][0]);
			formData.append('picture', pictures[0][0]);
			formData.append('title', data.title);
			formData.append('description', data.description);
			formData.append('brand', data.brand);
			formData.append('size', data.size);
			formData.append('color', data.color);
			formData.append('city', data.city);
			formData.append('price', data.price);
			formData.append('condition', data.condition);

			const token = Cookies.get('token');
			const config = {
				headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
			};

			const url = 'https://site--vinted-backend--gsmxcbzt8tzm.code.run/offer/publish';
			// const url = 'http://localhost:8080/offer/publish';

			const response = await axios.post(url, formData, config);
			console.log(response.data);
			navigate('/');
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<div className="background-publish-wrapper">
				<section className="publish-wrapper">
					<h1>Vends ton article</h1>
					<div className="upload-picture-container">
						<div {...getRootProps({ className: 'dropzone upload-picture-dashed' })}>
							<label className={loadedImage.length === 0 ? 'upload-button' : 'upload-button-hidden'}>
								<input {...getInputProps()} />
								<span>+</span>
								<span>Glissez/déposer une image</span>
							</label>

							{loadedImage ? (
								<>
									{loadedImage.map((picture, index) => {
										if (index < 3) {
											return (
												<div key={index} className="uploaded-picture-wrapper">
													<img src={picture} alt={picture}></img>
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
						{loadedImage ? (
							<div>
								<ul className="file-names-upload">{files}</ul>
							</div>
						) : null}
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
								<input {...register('price')} type="number" min="1" placeholder="0,00 €" />
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
