import { combineReducers } from 'redux';
import { clouds } from './CloudReducer';
import { vm_group, templates } from './VMGroupReducer';
import { clusters, selectedCluster } from './ClusterReducer';

export  const allReducers = combineReducers({
	clouds,
	vm_group,
	templates,
	clusters,
	selectedCluster
})
