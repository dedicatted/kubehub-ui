import { combineReducers } from 'redux'
import { clouds, cloudId } from './CloudReducer';
import { vm_group, templates } from './VMGroupReducer'

export  const allReducers = combineReducers({
	clouds,
	vm_group,
	cloudId,
	templates
})
