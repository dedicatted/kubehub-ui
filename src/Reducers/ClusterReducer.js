export const clusters =(state = [], action) => {
	switch (action.type) {
		case "SHOW_CLUSTERS":
			return action.clusters;
		default:
			return state;
	}
}

export const clusterLog = (state = "", action) => {
	switch (action.type) {
		case "CLUSTER_LOG":
			return state+= action.clusterLog
		case "CLEAR_CLUSTER_LOG":
			return state = ""
		default:
			return state;
	}
}
