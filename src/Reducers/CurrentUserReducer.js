export const currentUser = (state = {}, action) => {
	switch (action.type) {
		case 'SELECT_USER' :
			return action.userData;
		default:
			return state;
	}
}
