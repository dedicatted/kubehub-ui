const SELECT_USER = 'SELECT_USER';

export const selectUser = (userData) => {
	return {
		type: SELECT_USER,
		userData: userData,
	}
}
