import { serverURL } from "./serverLink";
import { useSelector } from "react-redux";

class Auth {
	constructor() {
		this.authenticated = false;
	}
	login(email, password, cb) {
		this.authenticated = true;
		fetch(`${serverURL}/api/login`,{
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			})
		})
		.then(response => response.json())
		.then(data => {
			localStorage.setItem('accessToken', data.token);
			localStorage.setItem('refreshToken', data.refreshToken);
			this.authenticated = true;
		})
		.then(cb())
		.then()
		.catch(error => console.log(error));
	}
	refreshToken() {
		fetch(`${serverURL}/api/refreshToken`, {
			method: 'POST',
			body: JSON.stringify({
				refreshToken: localStorage.getItem('refreshToken'),
			})
		})
		.then(response => response.json())
		.then(data => {
			localStorage.setItem('accessToken', data.token);
			localStorage.setItem('refreshToken', data.refreshToken);
		})
		.catch(error => console.log(error));
	}

	logout(cb) {
		localStorage.clear();
		cb();
		this.authenticated = false;
	}

	isAuthenticated() {
		return this.authenticated;
	}
}

export default new Auth();
