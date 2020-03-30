export const clouds = (state = [], action) => {
	switch(action.type) {
		case 'ADD_CLOUD':
			return [...state,
				{
					cp_type: action.cp_type,
					name:action.name,
					api_endpoint: action.api_endpoint,
					password: action.password
				}
			];
		case 'SHOW_CLOUDS':
			return action.cloudsInBD;
		case 'DELETE_CLOUD':
			state.splice(action.index,1);
			return state;
		case 'EDIT_CLOUD':
			state[action.index] = {
				id: state[action.index].id,
				cp_type: action.cp_type,
				name:action.name,
				api_endpoint: state[action.index].api_endpoint,
				password: state[action.index].password
			};
			return state;
		default:
			return state;
	}
}
