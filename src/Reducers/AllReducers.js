import { combineReducers } from 'redux';
import { clouds } from './CloudReducer';
import { vm_group, templates } from './VMGroupReducer';
import { clusters, selectedCluster } from './ClusterReducer';
import { kubernetesVersions } from './KubernetesVersionsReducer';
export  const allReducers = combineReducers({
	clouds,
	vm_group,
	templates,
	clusters,
	selectedCluster,
	kubernetesVersions
})
