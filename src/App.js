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
import OfferPublished from './components/OfferPublished';
import Loader from './components/Loader';

//Main App
function App() {
	const [token, setToken] = useState(Cookies.get('token') || null);
	const [userId, SetUserId] = useState(Cookies.get('id' || null));

	const [loginVisible, setLoginVisible] = useState(false);
	const [signupVisible, setSignupVisible] = useState(false);
	const [publishedOffer, setPublishedOffer] = useState(false);
	const [loader, setLoader] = useState(false);

	const [filter, setFilter] = useState(false);
	const [filterObj, setFilterObj] = useState([{ title: '', priceMin: null, priceMax: null, sort: 'price-asc', page: 1, resultNumber: 1000 }]);

	const handleToken = (token, id) => {
		if (token) {
			setToken(token);
			SetUserId(id);
			Cookies.set('token', token, { expires: 7 });
			Cookies.set('id', id, { expires: 7 });
		} else {
			setToken(null);
			SetUserId(null);
			Cookies.remove('token');
			Cookies.remove('id');
		}
	};

	return (
		<>
			<Router>
				<Header handleToken={handleToken} setLoginVisible={setLoginVisible} setSignupVisible={setSignupVisible} filterObj={filterObj} setFilterObj={setFilterObj} setFilter={setFilter}></Header>
				<Routes>
					<Route path="/" element={<Home setLoader={setLoader} setLoginVisible={setLoginVisible} setFilterObj={setFilterObj} filterObj={filterObj} filter={filter} setFilter={setFilter}></Home>}></Route>
					<Route path="/offer/:id" element={<Offer setLoginVisible={setLoginVisible}></Offer>}></Route>
					<Route path="/publish" element={<Publish setLoader={setLoader} token={token} setLoginVisible={setLoginVisible} setPublishedOffer={setPublishedOffer}></Publish>}></Route>
					<Route path="/payment" element={<Payment setLoader={setLoader} userId={userId} token={token}></Payment>}></Route>
				</Routes>
				<Footer></Footer>
				{/* Modals */}
				{loader && <Loader></Loader>}
				{publishedOffer && <OfferPublished setPublishedOffer={setPublishedOffer}></OfferPublished>}
				{loginVisible && <Login handleToken={handleToken} setLoginVisible={setLoginVisible} setSignupVisible={setSignupVisible}></Login>}
				{signupVisible && <Signup handleToken={handleToken} setSignupVisible={setSignupVisible} setLoginVisible={setLoginVisible}></Signup>}
			</Router>
		</>
	);
}

export default App;
