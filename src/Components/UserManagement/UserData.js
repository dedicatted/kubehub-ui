import React from 'react';
import { Container, Typography, makeStyles, Card, Box, Divider } from '@material-ui/core';
import { commonStyles } from '../../styles/style';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link, useRouteMatch } from 'react-router-dom';
import { UserAvatar } from './UserAvatar';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
	},
	description: {
		color: '#5f6368',
	},
	card: {
		margin: theme.spacing(3),
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	item: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: theme.spacing(1),
		'&:hover' : {
			backgroundColor: '#f5f5f5',
		}
	},
	avatarLarge: {
		width: theme.spacing(6),
		height: theme.spacing(6),
	},
	textPadding: {
		paddingRight: theme.spacing(40)
	},
	profile: {
		paddingLeft: theme.spacing(1)
	}
}))

// Need to delete
const user = {
	name: "Artem",
	secondName: "Lakhurov",
	password: "lakhurov@gmail.com",
	email: 'lakhurov@gmail.com'
}

export function UserData() {
	const classes = useStyles();
	const commonClasses = commonStyles();
	let { url } = useRouteMatch();
	return (
		<Container maxWidth='xl' className={commonClasses.container}>
			<Container component='div' className={classes.root}>
				<Typography component='h1' variant ='h4' align='center'>Personal data</Typography>
				<Typography component='p' align='center' className={classes.description}>Basic information (e.g. name and photo)</Typography>
			</Container>
			<Card className={classes.card}>
				<Typography component='h5' variant='h5' className={classes.profile}>Profile</Typography>
				<Link to={`${url}/photo`} className={commonClasses.links}>
					<Box component='div' style={{justifyContent: 'space-between'}} className={classes.item}>
						<Typography className={classes.description}>Photo</Typography>
						<UserAvatar className={classes.avatarLarge} />
					</Box>
				</Link>
				<Divider />
				<Link to={`${url}/name`} className={commonClasses.links}>
					<Box component='div' className={classes.item}>
						<Typography className={classes.description}>Name</Typography>
						<Typography className={classes.textPadding}>{`${user.name} ${user.secondName}`}</Typography>
						<ArrowForwardIosIcon className={classes.description} />
					</Box>
				</Link>
				<Divider />
				<Link to={`${url}/email`} className={commonClasses.links}>
					<Box component='div' className={classes.item}>
						<Typography className={classes.description}>Email</Typography>
						<Typography className={classes.textPadding}>{user.email}</Typography>
						<ArrowForwardIosIcon className={classes.description} />
					</Box>
				</Link>
				<Divider />
				<Link to={`${url}/password`} className={commonClasses.links}>
					<Box component='div' className={classes.item}>
						<Typography className={classes.description}>Password</Typography>
						<Typography className={classes.textPadding}>{'*'.repeat(user.password.length)}</Typography>
						<ArrowForwardIosIcon className={classes.description}/>
					</Box>
				</Link>
			</Card>
		</Container>
	)
}
