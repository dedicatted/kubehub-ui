export const templates = (state = [], action) => {
	switch(action.type) {
		 case 'ADD_TEMPLATES':
			return action.templates;
		default:
			return state;
	}
}
