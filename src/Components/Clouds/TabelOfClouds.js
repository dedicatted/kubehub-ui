import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, makeStyles  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { deleteCloud } from '../../Actions/CloudActions';
import { serverURL } from '../Dashboard';
import { Link, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	deleteIcon: {
		'&:hover' : {
			color: '#f44336'
		}
	},
	editIcon: {
		'&:hover' : {
			color: '#2196f3'
		}
	}
}))

export function TableOfClouds (props) {
	const classes = useStyles();
	let {url} = useRouteMatch();
	const deleteCloudData = (index) => {
		for(let i = 0; i <= props.clouds.length; i++) {
			if(props.clouds[i].id === index) {
				fetch(`${serverURL}/api/cloud_providers/remove`,{
					method: 'POST',
					body: JSON.stringify({id: index})
				})
				.then(() => props.dispatch(deleteCloud(i)))
				.then(() => props.refreshCloudData())
				break;
			}
		}
	};
	return (
		<TableContainer>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="center">API-Endpoint</TableCell>
						<TableCell align="center">CP-Type</TableCell>
						<TableCell align="center">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.clouds.map((cloud, i) => {
						return (
							<TableRow key={i}>
								<TableCell component="th" scope="row">{cloud.name}</TableCell>
								<TableCell align="center">{cloud.api_endpoint}</TableCell>
								<TableCell align="center">{cloud.cp_type}</TableCell>
								<TableCell align="center">
									<IconButton aria-label="delete" onClick={() => {deleteCloudData(cloud.id)}} className={classes.deleteIcon}>
										<DeleteIcon />
									</IconButton>
									<Link to={`${url}/edit_cloud`}>
										<IconButton onClick={() => {props.handleEditWindowOpen(cloud.id)}} className={classes.editIcon}>
											<EditIcon />
										</IconButton>
									</Link>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
