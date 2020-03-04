export const clusters =(state =[], action) => {
	switch (action.type) {
		case 'SHOW_CLUSTERS':
			return action.clusters;
		default:
			return state;
	}
}
