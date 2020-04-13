import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, makeStyles, Container, Card, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { commonStyles } from '../../styles/style';
import EditIcon from '@material-ui/icons/Edit';
import EditName from './EditName';

const useStyles = makeStyles(theme => ({
	appBar: {
		backgroundColor: 'white'
	},
	backIcon: {
		marginRight: theme.spacing(1)
	},
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
	const user = {
		name: "Artem",
		secondName: "Lakhurov",
		password: "lakhurov@gmail.com",
		email: 'lakhurov@gmail.com'
	}
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
	  setOpen(true);
	};
	const handleClose = () => {
	  setOpen(false);
	};

	return(
		<React.Fragment>
			<AppBar position='static' className={classes.appBar}>
				<Toolbar>
					<Link to="/user">
						<IconButton className={classes.backIcon}>
							<ArrowBackIcon color='primary' />
						</IconButton>
					</Link>
					<Typography color='primary' variant='h6' >Name</Typography>
				</Toolbar>
			</AppBar>
			<Container maxWidth='xl' className={commonClasses.container}>
				<Card className={classes.card}>
					<Box className={classes.item}>
						<Typography>{`${user.name} ${user.secondName}`}</Typography>
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
		</React.Fragment>
	)
}
