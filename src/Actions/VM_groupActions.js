const ADD_VM_GROUP = 'ADD_VM_GROUP';
const GET_TEMPLATES = 'GET_TEMPLATES';
const SHOW_VM_GROUP = 'SHOW_VM_GROUP';
export const addVM_group = (cloud_provider_id, template_id, number_of_nodes, node, name) => {
	return {
		type: ADD_VM_GROUP,
		cloud_provider_id: cloud_provider_id,
		template_id: template_id,
		number_of_nodes: number_of_nodes,
		node: node,
		name: name
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
