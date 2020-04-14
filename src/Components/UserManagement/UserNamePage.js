import React from 'react';
import { IconButton, Typography, makeStyles, Container, Card, Box } from '@material-ui/core';
import { commonStyles } from '../../styles/style';
import EditIcon from '@material-ui/icons/Edit';
import EditName from './EditName';
import { useSelector } from 'react-redux';
import { TopBar } from '../TopBar';

const useStyles = makeStyles(theme => ({
	item: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: theme.spacing(1),
	},
	card: {
		margin: theme.spacing(3),
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	description: {
		color: '#5f6368',
	},
}));

export function UserNamePage() {
	const classes = useStyles();
	const commonClasses = commonStyles();
	const user = useSelector(state => state.currentUser);
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
	  setOpen(true);
	};
	const handleClose = () => {
	  setOpen(false);
	};

	return(
		<>
			<TopBar backIcon link='/user' title='Name' />
			<Container maxWidth='xl' className={commonClasses.container}>
				<Card className={classes.card}>
					<Box className={classes.item}>
						<Typography>{`${user.name} ${user.surname}`}</Typography>
						<IconButton>
							<EditIcon className={classes.description} onClick={handleClickOpen}/>
						</IconButton>
					</Box>
				</Card>
			</Container>
			<EditName
				open={open}
				handleClose={handleClose}
				user={user}
			/>
		</>
	)
}
