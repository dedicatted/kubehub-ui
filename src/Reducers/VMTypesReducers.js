export const VMTypes = (state = [], action) => {
	switch(action.type) {
		case 'ADD_VMTYPES':
			return action.VMTypes;
		case 'ADD_VMTYPE':
			return [...state, action.VMType]
		default:
			return state;
	}
}
