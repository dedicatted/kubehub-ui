export const vm_group = (state = [], action) => {
	switch(action.type) {
		case 'ADD_VM_GROUP':
			return [...state, action.data];
		case 'SHOW_VM_GROUP':
			return action.VM_Group
		case 'DELETE_VM_GROUP':
			for(let i = 0; i <= state.length; i++) {
				if (state[i].id === action.VM_GroupId) {
					state.splice(i,1);
					break;
				}

				// console.log(state[i].id);

			};
			return state;
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
