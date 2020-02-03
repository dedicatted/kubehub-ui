import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {
	Link
} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { showClouds } from '../../Actions/CloudActions';
import CloudCircleIcon from '@material-ui/icons/CloudCircle';

const useStyle = makeStyles({
	links: {
		color: 'black',
		textDecoration: 'none'
	}
})

export function MainListItems()	{
	const classes = useStyle();
	const dispatch = useDispatch();
	function getCloudData () {
		fetch('http://192.168.84.189:8080/api/cloud_providers/list')
		.then(response => response.json())
		.then(data => data.cloud_provider_list)
		.then(data => {
			dispatch(showClouds(data))
		})
	}
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
					<ListItem button onClick={getCloudData}>
						<ListItemIcon>
							<CloudCircleIcon />
						</ListItemIcon>
						<ListItemText primary="Clouds" />
					</ListItem>
				</Link>
				<Link to={{pathname: '/customers'}} className={classes.links}>
					<ListItem button >
						<ListItemIcon>
							<PeopleIcon />
						</ListItemIcon>
						<ListItemText primary="Customers" />
					</ListItem>
				</Link>
				<Link to={{pathname: '/reports'}} className={classes.links}>
					<ListItem button>
						<ListItemIcon>
							<BarChartIcon />
						</ListItemIcon>
						<ListItemText primary="Reports" />
					</ListItem>
				</Link>
				<Link to={{pathname: '/integrations'}} className={classes.links} >
					<ListItem button>
						<ListItemIcon>
							<LayersIcon />
						</ListItemIcon>
						<ListItemText primary="Integrations" />
					</ListItem>
				</Link>
			</div>
		)
	};

export function SecondaryListItems() {
	const classes = useStyle();
	return(
	<div>
		<ListSubheader inset>Saved reports</ListSubheader>
		<Link to={{pathname: '/CurrentMonth'}} className={classes.links}>
			<ListItem button>
				<ListItemIcon>
					<AssignmentIcon />
				</ListItemIcon>
				<ListItemText primary="Current month" />
			</ListItem>
		</Link>
		<Link to={{pathname: '/LastQuarter'}} className={classes.links}>
			<ListItem button>
				<ListItemIcon>
					<AssignmentIcon />
				</ListItemIcon>
				<ListItemText primary="Last quarter" />
			</ListItem>
		</Link>
		<Link to={{pathname: '/Year-endSale'}} className={classes.links}>
			<ListItem button>
				<ListItemIcon>
					<AssignmentIcon />
				</ListItemIcon>
				<ListItemText primary="Year-end sale" />
			</ListItem>
		</Link>
	</div>
	)
};
