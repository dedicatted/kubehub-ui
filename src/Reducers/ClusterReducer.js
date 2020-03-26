export const clusters = (state = [], action) => {
	switch (action.type) {
		case "SHOW_CLUSTERS":
			return action.clusters;
		default:
			return state;
	}
}

export const selectedCluster = (state = {}, action) => {
	switch (action.type) {
		case "SELECT_CLUSTER":
			return state = action.cluster;
		default:
			return state;
	}
}
