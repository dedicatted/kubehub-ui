export const kubernetesVersions = (state = [], action) => {
	switch (action.type) {
		case "ADD_KUBERNETES_VERSIONS":
			return state = action.kubernetesVersions
		default:
			return state;
	}
}
