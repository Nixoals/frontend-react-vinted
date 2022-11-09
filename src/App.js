import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Offer from './components/Offer/Offer';
import Home from './components/home/Home';

function App() {
	return (
		<>
			<Router>
				<Header></Header>
				<Routes>
					<Route path="/" element={<Home></Home>}></Route>
					<Route path="/offer/:id" element={<Offer></Offer>}></Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
