export const images = (state = [], action) => {
	switch(action.type) {
		 case 'ADD_IMAGES':
			return action.images;
		default:
			return state;
	}
}
