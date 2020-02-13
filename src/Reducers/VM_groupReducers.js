export const vm_group = (state = [], action) => {
	switch(action.type) {
		case 'ADD_VM_GROUP':
			return [...state,
				{
					cloud_provider_id: action.cloud_provider_id,
					template_id:action.template_id,
					number_of_nodes: action.number_of_nodes,
					node: action.node,
					name: action.name
				}
			]
		case 'SHOW_VM_GROUP':
			return action.VM_Group
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
