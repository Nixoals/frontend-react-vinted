//mainStyle
import './App.css';
//functions
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';

//Pages routes
import Offer from './pages/Offer';
import Home from './pages/Home';
import Sell from './pages/Sell';
//components && modals
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';

//Main App
function App() {
	const [token, setToken] = useState(Cookies.get('token') || null);
	const [loginVisible, setLoginVisible] = useState(false);
	const [signupVisible, setSignupVisible] = useState(false);
	const [filter, setFilter] = useState(false);
	const [filterObj, setFilterObj] = useState([{ title: '', priceMin: 0, priceMax: 200, sort: 'price-asc', page: 1, resultNumber: 1000 }]);

	const handleToken = (token) => {
		if (token) {
			setToken(token);
			Cookies.set('token', token, { expires: 7 });
		} else {
			setToken(null);
			Cookies.remove('token');
		}
	};
	return (
		<>
			<Router>
				<Header handleToken={handleToken} setLoginVisible={setLoginVisible} setSignupVisible={setSignupVisible} filterObj={filterObj} setFilterObj={setFilterObj} setFilter={setFilter}></Header>
				<Routes>
					<Route path="/" element={<Home setLoginVisible={setLoginVisible} filterObj={filterObj} filter={filter} setFilter={setFilter}></Home>}></Route>
					<Route path="/offer/:id" element={<Offer></Offer>}></Route>
					<Route path="/sell-items" element={<Sell token={token}></Sell>}></Route>
				</Routes>
				{/* Modals */}
				{loginVisible && <Login handleToken={handleToken} setLoginVisible={setLoginVisible} setSignupVisible={setSignupVisible}></Login>}
				{signupVisible && <Signup handleToken={handleToken} setSignupVisible={setSignupVisible} setLoginVisible={setLoginVisible}></Signup>}
			</Router>
		</>
	);
}

export default App;
