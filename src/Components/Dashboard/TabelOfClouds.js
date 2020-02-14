import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { deleteCloud } from '../../Actions/CloudActions';

export function TableOfClouds (props) {
	const clouds = useSelector(state => state.clouds);
	const dispatch = useDispatch();
	const serverUrl = 'http://192.168.84.189:8080';
	const deleteCloudData = (index) => {
		for(let i = 0; i <= clouds.length; i++) {
			if(clouds[i].id === index) {
				dispatch(deleteCloud(i));
				fetch(`${serverUrl}/api/cloud_providers/remove`,{
					method: 'POST',
					body: JSON.stringify({id: index})
				})
				.then(data => {
					console.log(data);
					return data;
				})
				.then(() => props.refreshCloudData())
				break;

			}
		}
	}



	return (
		<TableContainer>
			<Table aria-label="simple table">
				<TableHead>
				<TableRow>
					<TableCell align="center">Name</TableCell>
					<TableCell align="center">API-Endpoint</TableCell>
					<TableCell align="center">CP-Type</TableCell>
					<TableCell align="center">Actions</TableCell>
				</TableRow>
				</TableHead>
				<TableBody>
					{clouds.map((cloud, i) => {
						console.log(clouds[i].id);
						return (
							<TableRow key={i}>
							<TableCell component="th" scope="row" align="center">{cloud.name}</TableCell>
							<TableCell align="center">{cloud.api_endpoint}</TableCell>
							<TableCell align="center">{cloud.cp_type}</TableCell>
							<TableCell align="center">
							<IconButton aria-label="delete" onClick={() => {deleteCloudData(cloud.id)}}>
								<DeleteIcon />
							</IconButton>
							<IconButton onClick={() => {props.handleEditWindowOpen(cloud.id)}}>
								<EditIcon />
							</IconButton>
							</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
