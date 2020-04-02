const ADD_KUBERNETES_VERSIONS = "ADD_KUBERNETES_VERSIONS";

export const addKubernetesVersions = (kubernetesVersions) => {
	return {
		type: ADD_KUBERNETES_VERSIONS,
		kubernetesVersions: kubernetesVersions
	}
}
