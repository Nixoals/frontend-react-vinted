import './App.css';
//functions
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';

//Pages routes
import Header from './components/Header';
import Offer from './components/Offer/Offer';
import Home from './components/home/Home';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import Sell from './components/Sell/Sell';

function App() {
	const [token, setToken] = useState(Cookies.get('token') || null);
	const [loginVisible, setLoginVisible] = useState(false);
	const [signupVisible, setSignupVisible] = useState(false);
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
				<Header handleToken={handleToken} setLoginVisible={setLoginVisible} setSignupVisible={setSignupVisible}></Header>
				<Routes>
					<Route path="/" element={<Home></Home>}></Route>
					<Route path="/offer/:id" element={<Offer></Offer>}></Route>
					{/* <Route path="/login" element={<Login handleToken={handleToken}></Login>}></Route>
					<Route path="/signup" element={<Signup handleToken={handleToken}></Signup>}></Route> */}
					<Route path="/sell-items" element={<Sell token={token}></Sell>}></Route>
				</Routes>
				{loginVisible && <Login setLoginVisible={setLoginVisible}></Login>}
				{signupVisible && <Signup setSignupVisible={setSignupVisible}></Signup>}
				{/* <ModalUser loginVisible={loginVisible} setLoginVisible={setLoginVisible} signupVisible={signupVisible} setSignupVisible={setSignupVisible}></ModalUser> */}
			</Router>
		</>
	);
}

export default App;
