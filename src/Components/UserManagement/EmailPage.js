import React from 'react';
import { makeStyles, Typography, Container, Card, Box } from '@material-ui/core';
import { commonStyles } from '../../styles/style';
import { UserAppBar } from './UserAppBar';

const useStyles = makeStyles(theme => ({
	description: {
		color: '#5f6368',
		fontSize: 'small',
		paddingTop: theme.spacing(1)
	},
	item: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(1),
	},
	card: {
		margin: theme.spacing(3),
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	box: {
		margin: 'auto'
	},
}))

const user = {
	name: "Artem",
	secondName: "Lakhurov",
	password: "lakhurov@gmail.com",
	email: 'lakhurov@gmail.com'
}

export function EmailPage() {
	const classes = useStyles();
	const commonClasses = commonStyles();

	return(
		<React.Fragment>
			<UserAppBar title='E-mail address' />
			<Container maxWidth='xl' className={commonClasses.container}>
					<Card className={classes.card}>
						<Box className={classes.item}>
							<Box mr='40%'>
								<Typography>E-mail address</Typography>
							</Box>
							<Typography>
								{user.email}
								<Typography component='div' className={classes.description}>
									Address used to identify your account
								</Typography>
							</Typography>
						</Box>
					</Card>
			</Container>
		</React.Fragment>
	)
}
