import React from 'react';
import { makeStyles, Typography, Container, Card, Box } from '@material-ui/core';
import { commonStyles } from '../../styles/style';
import { useSelector } from 'react-redux';
import { TopBar } from '../TopBar';

const useStyles = makeStyles(theme => ({
	description: {
		color: '#5f6368',
		fontSize: 'small',
		paddingTop: theme.spacing(1),
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


export function EmailPage() {
	const classes = useStyles();
	const commonClasses = commonStyles();
	const user = useSelector(state => state.currentUser);

	return(
		<React.Fragment>
			<TopBar backIcon title='E-mail address' />
			<Container maxWidth='xl' className={commonClasses.container}>
					<Card className={classes.card}>
						<Box className={classes.item}>
							<Box mr='40%'>
								<Typography>E-mail address</Typography>
							</Box>
							<Box>
								<Typography component='div'>{user.email}</Typography>
								<Typography component='div' className={classes.description}>
									Address used to identify your account
								</Typography>
							</Box>
						</Box>
					</Card>
			</Container>
		</React.Fragment>
	)
}
