import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, CssBaseline, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { MainListItems } from './listItems';
import { Routes } from '../Routes';
import { useSelector, useDispatch } from 'react-redux';
import { UserCard } from './UserManagement/UserCard';
import { selectUser } from '../Actions/CurrentUserActions';


const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
 	root: {
 	 	display: 'flex',
 	},
 	toolbar: {
 	 	paddingRight: 24, // keep right padding when drawer closed
 	},
 	appBar: {
 	 	zIndex: theme.zIndex.drawer + 1,
 	 	transition: theme.transitions.create(['width', 'margin'], {
 	 	 	easing: theme.transitions.easing.sharp,
 	 	 	duration: theme.transitions.duration.leavingScreen,
 	 	}),
 	},

 	menuButton: {
 	 	marginRight: 36,
 	},
 	menuButtonHidden: {
 	 	display: 'none',
 	},
 	title: {
 	 	flexGrow: 1,
	},
 	drawerPaper: {
 	 	position: 'relative',
 	 	whiteSpace: 'nowrap',
 	 	width: drawerWidth,
 	 	transition: theme.transitions.create('width', {
 	 	 	easing: theme.transitions.easing.sharp,
 	 	 	duration: theme.transitions.duration.enteringScreen,
 	 	}),
 	},
 	drawerPaperClose: {
 	 	overflowX: 'hidden',
 	 	transition: theme.transitions.create('width', {
 	 	 	easing: theme.transitions.easing.sharp,
 	 	 	duration: theme.transitions.duration.leavingScreen,
 	 	}),
 	 	width: theme.spacing(7),
 	 	[theme.breakpoints.up('sm')]: {
 	 	 	width: theme.spacing(9),
 	 	},
 	},
 	appBarSpacer: theme.mixins.toolbar,
 	content: {
 	 	flexGrow: 1,
 	 	height: '100vh',
 	 	overflow: 'auto',
	},
	logBackgroundColor: {
		backgroundColor: "#1a1918"
	},
 	container: {
 	 	paddingTop: theme.spacing(4),
 	 	paddingBottom: theme.spacing(4),
 	},
 	paper: {
 	 	padding: theme.spacing(2),
 	 	display: 'flex',
 	 	overflow: 'auto',
 	 	flexDirection: 'column',
 	},
}));

export function clearFields() {
	for(let i = 0; i < arguments.length; i++) {
		arguments[i]('');
	}
}
//Need to Delete
const user = {
	name: "Artem",
	surname: "Lakhurov",
	password: "1111",
	email: 'lakhurov@gmail.com',
	admin: true,
}

export 	function Dashboard() {
	 const classes = useStyles();
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const selectedCluster = useSelector(state => state.selectedCluster);
 	const handleDrawerOpenClose = () => {
 	 	setOpen(!open);
	};

	useEffect(() => {
		dispatch(selectUser(user))
	}, [dispatch]);

 	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="absolute" className={clsx(classes.appBar)}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpenClose}
						className={clsx(classes.menuButton)}
					>
						<MenuIcon />
					</IconButton>
					<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
						Kubehub
					</Typography>
					<UserCard />
					<IconButton color="inherit">
						<Badge badgeContent={4} color="secondary">
							<NotificationsIcon />
						</Badge>
					</IconButton>
				</Toolbar>
			</AppBar>
			{/* LeftBar */}
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}
			>
				<div className={classes.appBarSpacer} />
				<List>
					<MainListItems />
				</List>
				<Divider />
			</Drawer>
			<main className={Object.keys(selectedCluster).length !== 0
				? [classes.content, classes.logBackgroundColor].join(' ')
				: classes.content
			}>
				<div className={classes.appBarSpacer} />
				{Routes}
			</main>
		</div>
 	);
}
