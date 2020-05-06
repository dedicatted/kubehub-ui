const ADD_VMTYPES = 'ADD_VMTYPES';
const ADD_VMTYPE = 'ADD_VMTYPE';

export const addVMTypes = VMTypes => {
	return {
		type: ADD_VMTYPES,
		VMTypes
	}
}

export const addVMType = VMType => {
	return {
		type: ADD_VMTYPE,
		VMType
	}
}
