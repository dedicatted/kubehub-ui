import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	typography: {
		padding: theme.spacing(1)
	},
}))


export function DescriptionTypography (props) {
	const classes = useStyles();

	return (
		<Typography variant='body1' className={classes.typography}>{props.children}</Typography>
	)
}
