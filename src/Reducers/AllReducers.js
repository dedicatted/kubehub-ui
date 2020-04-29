import { combineReducers } from 'redux';
import { clouds } from './CloudReducer';
import { vm_group } from './VMGroupReducer';
import { clusters, selectedCluster } from './ClusterReducer';
import { kubernetesVersions } from './KubernetesVersionsReducer';
import { VMTypes } from './VMTypesReducers';
import { currentUser } from './CurrentUserReducer';
import { users } from './UsersReducer';

export  const allReducers = combineReducers({
	clouds,
	vm_group,
	clusters,
	selectedCluster,
	kubernetesVersions,
	VMTypes,
	currentUser,
	users
});
