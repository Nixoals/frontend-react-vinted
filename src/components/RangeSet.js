import { Range, getTrackBackground } from 'react-range';

const RangeSet = ({ values, setValues, handlePriceRange }) => {
	const COLORS = ['#ccc', '#007782', '#ccc'];
	return (
		<>
			<Range
				values={values}
				step={5}
				min={0}
				max={500}
				rtl={false}
				onChange={(values) => {
					setValues(values);
				}}
				onFinalChange={(values) => {
					handlePriceRange(values);
				}}
				renderTrack={({ props, children }) => (
					<div
						onMouseDown={props.onMouseDown}
						onTouchStart={props.onTouchStart}
						style={{
							...props.style,
							height: '36px',
							display: 'flex',
							width: '100%',
						}}
					>
						<div
							ref={props.ref}
							style={{
								height: '5px',
								width: '100%',
								borderRadius: '4px',
								background: getTrackBackground({
									values,
									colors: COLORS,
									min: 0,
									max: 500,
									rtl: false,
								}),
								alignSelf: 'center',
							}}
						>
							{children}
						</div>
					</div>
				)}
				renderThumb={({ index, props, isDragged }) => (
					<div
						{...props}
						style={{
							...props.style,
							height: '15px',
							width: '15px',

							backgroundColor: '#007782',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							boxShadow: '0px 2px 6px #AAA',
							borderRadius: '50%',
						}}
					>
						<div style={{ position: 'absolute', top: '-25px', backgroundColor: '#007782', outline: 'none', borderRadius: '4px', color: 'white', fontSize: '10px', padding: '4px', height: '23px', width: 'auto' }}>{values[index].toFixed(0)}€</div>
						<div
							style={{
								height: '15px',
								width: '15px',
								borderRadius: '50%',
								backgroundColor: isDragged ? '#009782' : '#007782',
							}}
							tabIndex="1"
							index={10}
						></div>
					</div>
				)}
			></Range>
		</>
	);
};

export default RangeSet;
