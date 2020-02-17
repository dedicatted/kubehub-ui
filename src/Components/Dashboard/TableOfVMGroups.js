import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector, useDispatch } from 'react-redux';
import { showVMGroup } from '../../Actions/VM_groupActions'
import { Button, Typography, Divider, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(thme => ({
	tableMargin: {
		marginBottom: '50px'
	},
}))
export function TableOfVMGroup (props) {
	const classes = useStyles();
	const serverUrl = 'http://192.168.84.189:8080';
	const dispatch = useDispatch();
	const VMGroup = useSelector(state => state.vm_group);
	const clouds = useSelector(state => state.clouds);
	const [stateVMGroup,setStateVMGroup] = useState(VMGroup);
	const refreshVMGroupData = () => {
		fetch(`${serverUrl}/api/proxmox/vm/group/list`)
		.then(response => response.json())
		.then(data => data.vm_group_list)
		.then(data => {
			dispatch(showVMGroup(data));
			return data;
		})
	}
	useEffect(refreshVMGroupData, [stateVMGroup]);
	return (
		<div>
			{VMGroup.map((VMGroupItem, i) => {
				return (
					<TableContainer className={classes.tableMargin} key={i}>
						{/* <h1>{VMGroupItem.vms[0].name}</h1> */}
						<Typography variant="h5">{VMGroupItem.vms[0].name}</Typography>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell align="center">IP</TableCell>
								<TableCell align="center">Cloud provider</TableCell>
								<TableCell align="center">Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{VMGroupItem.vms.map((VM, i) => {
								console.log(VMGroupItem[i]);
								return (
									<TableRow key={i}>
										<TableCell component="th" scope="row">{VM.name}</TableCell>
										<TableCell align="center">{VM.ip}</TableCell>
										<TableCell align="center">{
											clouds.map((cloud, i) => {
												return(clouds[i].id === VM.cloud_provider_id ? clouds[i].name : null)
											})
										}</TableCell>
									<TableCell align="center">
									{/* <IconButton aria-label="delete" onClick={() => {deleteCloudData(cloud.id)}}>
										<DeleteIcon />
									</IconButton>
									<IconButton onClick={() => {handleEditWindowOpen(cloud.id)}}>
										<EditIcon />
									</IconButton> */}
									</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
				)
			})}
			<Divider />
		</div>
	)
}
