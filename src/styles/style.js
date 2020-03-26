import { makeStyles } from "@material-ui/core";

export const commonStyles = makeStyles(theme => ({
	links: {
		color: 'black',
		textDecoration: 'none'
	},
	disabledLink: {
		pointerEvents: 'none'
	},
	margin: {
		marginRight: theme.spacing(1),
		marginTop: theme.spacing(1),
	},
	lable: {
		fontWeight: "bold",
		textTransform: "uppercase"
	},
	deleteIcon: {
		'&:hover' : {
			color: '#f44336'
		}
	},
	editIcon: {
		'&:hover' : {
			color: '#2196f3'
		}
	},
	startIcon: {
		'&:hover' : {
			color: '#4caf50'
		}
	},
	infoIcon: {
		'&:hover' : {
			color: '#607d8b'
		}
	},
	errorColor: {
		color: '#f44336'
	},
	successColor: {
		color: '#4caf50'
	},
	nameTextField: {
		width: '70%'
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	orangeColor: {
		"&:hover" : {
			color: "#ff9800"
		}
	},
}))
