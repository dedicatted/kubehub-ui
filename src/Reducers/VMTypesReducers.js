export const VMTypes = (state = [], action) => {
	switch(action.type) {
		 case 'GET_VMTYPES':
			 return action.VMTypes;
		default:
			return state;
	}
}
