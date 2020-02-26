import React from 'react';
import clsx from 'clsx';
import { makeStyles, CssBaseline, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, Badge, Container } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { MainListItems } from './listItems';
import { Routes } from '../../Routes';


const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
 	root: {
 	 	display: 'flex',
 	},
 	toolbar: {
 	 	paddingRight: 24, // keep right padding when drawer closed
 	},
 	toolbarIcon: {
 	 	display: 'flex',
 	 	alignItems: 'center',
 	 	justifyContent: 'flex-end',
 	 	padding: '0 8px',
 	 	...theme.mixins.toolbar,
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
 	fixedHeight: {
 	 	height: 240,
 	},
}));

export const serverURL = 'http://192.168.84.189:8080';
export 	function Dashboard() {
 	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

 	const handleDrawerOpenClose = () => {
 	 	setOpen(!open);
	 };

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
						Dedicatted
					</Typography>
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
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					{Routes}
				</Container>
			</main>
		</div>
 	);
}
