import { serverURL } from "../../serverLink";

class Auth {
	login(email, password, cb) {
		return fetch(`${serverURL}/api/auth/account/login`, {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(data => {
			if(data.access && data.refresh) {
				localStorage.setItem('accessToken', data.access);
				localStorage.setItem('refreshToken', data.refresh);
				// ! There need to add fetch user Data
				cb()
			}
			return data;
		})
	}
	refreshToken(cb) {
		fetch(`${serverURL}/api/auth/account/refresh-token`, {
			method: 'POST',
			body: JSON.stringify({
				refresh: localStorage.getItem('refreshToken'),
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(data => {
			localStorage.setItem('accessToken', data.access);
		})
		.then(cb())
		.catch(error => console.log(error));
	}
	logout(cb) {
		localStorage.clear();
		cb();
	}
}

export default new Auth();
