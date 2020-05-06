const ADD_IMAGES = "ADD_IMAGES";

export const addImages = (images) => {
	return {
		type: ADD_IMAGES,
		images
	}
}
