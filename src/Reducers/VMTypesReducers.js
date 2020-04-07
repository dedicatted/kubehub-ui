export const VMTypes = (state = [], action) => {
	switch(action.type) {
		 case 'ADD_VMTYPES':
			 return action.VMTypes;
		default:
			return state;
	}
}
