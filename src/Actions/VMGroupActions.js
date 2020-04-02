const ADD_VM_GROUP = 'ADD_VM_GROUP';
const SHOW_VM_GROUP = 'SHOW_VM_GROUP';

export const addVMGroup = (data) => {
	return {
		type: ADD_VM_GROUP,
		data: data
	}
}

export const showVMGroup = (VM_Group) => {
	return {
		type: SHOW_VM_GROUP,
		VM_Group: VM_Group
	}
}
