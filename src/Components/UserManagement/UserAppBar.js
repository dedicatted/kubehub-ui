import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
	appBar: {
		backgroundColor: 'white'
	},
	backIcon: {
		marginRight: theme.spacing(1)
	},
}))

export function UserAppBar(props) {
	const classes = useStyles();
	return (
		<AppBar position='static' className={classes.appBar}>
			<Toolbar>
				<Link to="/user">
					<IconButton className={classes.backIcon}>
						<ArrowBackIcon color='primary' />
					</IconButton>
				</Link>
				<Typography color='primary' variant='h6' >{props.title}</Typography>
			</Toolbar>
		</AppBar>
	)
}
