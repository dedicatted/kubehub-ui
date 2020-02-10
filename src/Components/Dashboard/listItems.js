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
			</div>
		)
	};
