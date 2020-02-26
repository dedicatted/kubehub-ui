const ADD_VM_GROUP = 'ADD_VM_GROUP';
const GET_TEMPLATES = 'GET_TEMPLATES';
const SHOW_VM_GROUP = 'SHOW_VM_GROUP';
export const addVM_group = (data) => {
	return {
		type: ADD_VM_GROUP,
		data: data
	}
}
export const getTemplates = (templates) => {
	return {
		type: GET_TEMPLATES,
		templates: templates
	}
}
export const showVMGroup = (VM_Group) => {
	return {
		type: SHOW_VM_GROUP,
		VM_Group: VM_Group
	}
}