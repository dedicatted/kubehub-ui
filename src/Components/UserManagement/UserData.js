import React from 'react';
import { Container, Typography, makeStyles, Card, Box, Divider } from '@material-ui/core';
import { commonStyles } from '../../styles/style';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link, useRouteMatch } from 'react-router-dom';
import { UserAvatar } from './UserAvatar';
import { useSelector } from 'react-redux';

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


export function UserData() {
	const classes = useStyles();
	const commonClasses = commonStyles();
	const user = useSelector(state => state.currentUser);
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
				{
					user.first_name && user.second_name
						? (
							<>
								<Divider />
								<Link to={`${url}/name`} className={commonClasses.links}>
									<Box component='div' className={classes.item}>
										<Typography className={classes.description}>Name</Typography>
										<Typography className={classes.textPadding}>{`${user.name} ${user.surname}`}</Typography>
										<ArrowForwardIosIcon className={classes.description} />
									</Box>
								</Link>
							</>
						)
						: null
				}
				<Divider />
				<Link to={`${url}/username`} className={commonClasses.links}>
					<Box component='div' className={classes.item}>
						<Typography className={classes.description}>Username</Typography>
						<Typography className={classes.textPadding}>{user.username}</Typography>
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
						<ArrowForwardIosIcon className={classes.description}/>
					</Box>
				</Link>
			</Card>
		</Container>
	)
}
