import { serverURL } from "./serverLink";

class Auth {
	login(email, password, cb) {
		fetch(`${serverURL}/api/login`, {
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
			localStorage.setItem('accessToken', data.token);
			localStorage.setItem('refreshToken', data.refreshToken);
			cb()
		})
		.catch((error) => console.log(error));
	}
	refreshToken() {
		fetch(`${serverURL}/api/refreshToken`, {
			method: 'POST',
			body: JSON.stringify({
				refreshToken: localStorage.getItem('refreshToken'),
			}),
			headers: {
				'Content-Type': 'application/json'
			}
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
	}
}

export default new Auth();
