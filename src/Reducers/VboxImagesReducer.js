export const VboxImages = (state = [], action) => {
	switch (action.type) {
		case 'ADD_VBOX_IMAGES':
			return action.images;
		default:
			return state;
	}
}
