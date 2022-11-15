import RingLoader from 'react-spinners/RingLoader';

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
};

const Loader = () => {
	return (
		<section className="loader-wrapper">
			<div className="loader-container">
				<div className="loading-title">Please wait...</div>
				<div className="sweet-loading">
					<RingLoader color={'#007782'} loading={true} cssOverride={override} size={50} aria-label="Loading Spinner" data-testid="loader" />
				</div>
			</div>
		</section>
	);
};

export default Loader;
