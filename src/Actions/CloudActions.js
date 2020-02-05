const ADD_CLOUD = 'ADD_CLOUD';
const SHOW_CLOUDS = 'SHOW_CLOUDS';
const DELETE_CLOUD = 'DELETE_CLOUD';
const EDIT_CLOUD = 'EDIT_CLOUD';
export const addCloud = (cp_type, name, api_endpoint, password) => {
	return {
		type: ADD_CLOUD,
		cp_type: cp_type,
		name: name,
		api_endpoint: api_endpoint,
		password: password
	}
}
export const showClouds = (cloudsInBD) => {
	return {
		type: SHOW_CLOUDS,
		cloudsInBD: cloudsInBD
	}
}

export const deleteCloud = (index) => {
	return {
		type: DELETE_CLOUD,
		index: index
	}
}
export const editCloud = (cp_type, name,index) => {
	return {
		type: EDIT_CLOUD,
		cp_type: cp_type,
		name: name,
		index:index
	}
}
