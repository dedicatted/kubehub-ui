import React from 'react';
import { ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom'
import CloudCircleIcon from '@material-ui/icons/CloudCircle';

const useStyle = makeStyles({
	links: {
		color: 'black',
		textDecoration: 'none'
	}
})

export function MainListItems()	{
	const classes = useStyle();
	return(
		<div>
			<Link to='/' className={classes.links}>
			<ListItem button>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				<ListItemText primary="Dashboard" />
			</ListItem>
			</Link>
			<Link to={{pathname: '/clouds'}} className={classes.links}>
				<ListItem button >
					<ListItemIcon>
						<CloudCircleIcon />
					</ListItemIcon>
					<ListItemText primary="Clouds" />
				</ListItem>
			</Link>
		</div>
	)
};
