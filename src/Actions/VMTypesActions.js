const GET_VMTYPES = "GET_VMTYPES";

export const getVMTypes = (VMTypes) => {
	return {
		type: GET_VMTYPES,
		VMTypes: VMTypes
	}
}
