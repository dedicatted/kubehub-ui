const ADD_TEMPLATES = "ADD_TEMPLATES";

export const addTemplates = (templates) => {
	return {
		type: ADD_TEMPLATES,
		templates
	}
}
