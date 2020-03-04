const SHOW_CLUSTERS = 'SHOW_CLUSTERS';

export const showClusters = (clusters) => {
	return {
		type: SHOW_CLUSTERS,
		clusters: clusters
	}
}
