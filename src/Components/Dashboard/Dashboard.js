import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
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
