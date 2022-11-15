//mainStyle
import './App.css';

//functions
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';

//Pages
import Offer from './pages/Offer';
import Home from './pages/Home';
import Publish from './pages/Publish';

//components && modals
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import Payment from './pages/Payment';

//Main App
function App() {
	const [token, setToken] = useState(Cookies.get('token') || null);
	const [loginVisible, setLoginVisible] = useState(false);
	const [signupVisible, setSignupVisible] = useState(false);
	const [filter, setFilter] = useState(false);
	const [filterObj, setFilterObj] = useState([{ title: '', priceMin: null, priceMax: null, sort: 'price-asc', page: 1, resultNumber: 1000 }]);

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
					<Route path="/offer/:id" element={<Offer setLoginVisible={setLoginVisible}></Offer>}></Route>
					<Route path="/publish" element={<Publish token={token} setLoginVisible={setLoginVisible}></Publish>}></Route>
					<Route path="/payment" element={<Payment token={token}></Payment>}></Route>
				</Routes>
				<Footer></Footer>
				{/* Modals */}
				{loginVisible && <Login handleToken={handleToken} setLoginVisible={setLoginVisible} setSignupVisible={setSignupVisible}></Login>}
				{signupVisible && <Signup handleToken={handleToken} setSignupVisible={setSignupVisible} setLoginVisible={setLoginVisible}></Signup>}
			</Router>
		</>
	);
}

export default App;
