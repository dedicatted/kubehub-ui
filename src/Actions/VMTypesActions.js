const ADD_VMTYPES = "ADD_VMTYPES";

export const addVMTypes = (VMTypes) => {
	return {
		type: ADD_VMTYPES,
		VMTypes: VMTypes
	}
}
