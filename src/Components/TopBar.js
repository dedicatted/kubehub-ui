import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
	appBar: {
		backgroundColor: 'white'
	},
	backIcon: {
		marginRight: theme.spacing(1)
	},
}))

export function TopBar(props) {
	const history = useHistory();
	const classes = useStyles();
	return (
		<AppBar position='static' className={classes.appBar}>
			<Toolbar>
				{
					props.backIcon
						? (
							<IconButton onClick={history.goBack} className={classes.backIcon}>
								<ArrowBackIcon color='primary' />
							</IconButton>
						)
						: null
				}
				<Typography color='primary' variant='h6' >{props.title}</Typography>
			</Toolbar>
		</AppBar>
	)
}
