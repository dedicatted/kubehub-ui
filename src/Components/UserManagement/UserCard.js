import React from 'react';
import {  makeStyles, Typography, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { commonStyles } from "../../styles/style"
import { UserAvatar } from './UserAvatar';
import { useSelector } from 'react-redux';
const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		alignItems: "center",
		backgroundColor: "inherit",
		padding: theme.spacing(0.5),
		transition: "all 0.5s",
		"&:hover" : {
			boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
		}

	},
	userName: {
		color: "white",
		marginRight: theme.spacing(1),
	}
}))

export function UserCard() {
	const classes = useStyles();
	const commonClasses = commonStyles();
	const user = useSelector(state => state.currentUser)

	return (
		<Link to={`/user`} className={commonClasses.links}>
			<Container component="span" className={classes.root}>
				<Typography component="h2" variant="body1" color="primary" className={classes.userName}>{`${user.name} ${user.surname}`}</Typography>
				<UserAvatar />
			</Container>
		</Link>
	)
}
