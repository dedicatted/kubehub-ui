export const users = (state = [], action) => {
	switch (action.type) {
		case 'GET_USERS':
			return state = action.users
		default:
			return state
	}
}
