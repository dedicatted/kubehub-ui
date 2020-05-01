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
				cb()
			}
			return data;
		})
	}
	refreshToken(cb) {
		return fetch(`${serverURL}/api/auth/account/refresh-token`, {
			method: 'POST',
			body: JSON.stringify({
				refresh: localStorage.getItem('refreshToken'),
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			if(response.status === 401) {
				Promise.reject();
			} else {
				return response.json()
			}
		})
		.then(data => {
			if(data.access) {
				localStorage.setItem('accessToken', data.access);
			}
		})
		.then(() => {
			if(cb) {
				cb();
			}
		})
		// .catch(error => console.log('*****************************************************************8'));
	}
	logout(cb) {
		localStorage.clear();
		cb();
	}
}

export default new Auth();
