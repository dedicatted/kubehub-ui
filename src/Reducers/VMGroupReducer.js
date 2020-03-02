export const vm_group = (state = [], action) => {
	switch(action.type) {
		case 'ADD_VM_GROUP':
			return [...state, action.data];
		case 'SHOW_VM_GROUP':
			return action.VM_Group
		default:
			return state;
	}
}
export const templates = (state = [], action) => {
	switch(action.type) {
		 case 'GET_TEMPLATES':
			 return action.templates
		default:
			return state
	}
}
