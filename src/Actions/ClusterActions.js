const SHOW_CLUSTERS = "SHOW_CLUSTERS";
const CLUSTER_LOG = "CLUSTER_LOG";
const CLEAR_CLUSTER_LOG = "CLEAR_CLUSTER_LOG";

export const showClusters = (clusters) => {
	return {
		type: SHOW_CLUSTERS,
		clusters: clusters
	}
}

export const clusterLog = (clusterLog) => {
	return {
		type: CLUSTER_LOG,
		clusterLog: clusterLog
	}
}

export const clearClusterLog = () => {
	return {
		type: CLEAR_CLUSTER_LOG,
	}
}
