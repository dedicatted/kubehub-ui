const SHOW_CLUSTERS = "SHOW_CLUSTERS";
const SELECT_CLUSTER = "SELECT_CLUSTER";

export const showClusters = (clusters) => {
	return {
		type: SHOW_CLUSTERS,
		clusters: clusters
	}
}

export const selectCluster = (cluster) => {
	return {
		type: SELECT_CLUSTER,
		cluster: cluster
	}
}
