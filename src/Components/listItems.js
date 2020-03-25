import React from 'react';
import { ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CloudCircleIcon from '@material-ui/icons/CloudCircle';
import ComputerIcon from '@material-ui/icons/Computer';
import StorageIcon from '@material-ui/icons/Storage';

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
			<Link to={{pathname: '/vm_group'}} className={classes.links}>
				<ListItem button >
					<ListItemIcon>
						<ComputerIcon />
					</ListItemIcon>
					<ListItemText primary="VM group" />
				</ListItem>
			</Link>
			<Link to={{pathname: '/clusters'}} className={classes.links}>
				<ListItem button>
					<ListItemIcon>
						<StorageIcon />
					</ListItemIcon>
					<ListItemText primary="Cluster" />
				</ListItem>
			</Link>
		</div>
	)
};
