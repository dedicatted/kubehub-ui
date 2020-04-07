import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IconButton, Tooltip, TableHead, TableRow, TableContainer, TableCell, TableBody, Table, CircularProgress, Container, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import VMTypeCard  from "../VMTypes/VMTypeCard";
import DeleteVMGroup from "./DeleteVMGroup";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { commonStyles } from "../../styles/style";
import { Link, useRouteMatch } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

export function TableOfVMGroup (props) {
	const classes = commonStyles();
	const VMGroups = useSelector(state => state.vm_group);
	const [selectedVMGroup, setSelectedVMGroup] = useState([]);
	const [deleteVMGroupWindow, setDeleteVMGroupWindow] = useState(false);
	let { url } = useRouteMatch();

	const handleDeleteVMGroupWindowOpen = (vm_group) => {
		setSelectedVMGroup(vm_group);
		setDeleteVMGroupWindow(true);
	};

	useEffect(props.getVMGroups, []);
	useEffect(() => {
		const interval = setInterval(() => {
			props.getVMGroups();
		}, 4000);
		return () => clearInterval(interval);
	  }, [props]);

	return (
		<Container maxWidth="xl" className={classes.container}>
			<Link to={`${url}/create_vm_group`} className={classes.links}>
				<Button
					color='primary'
					onClick={() => {props.getClouds()}}
					startIcon={<AddIcon />}
				>
					Create VM group
				</Button>
			</Link>
			<TableContainer className={classes.tableMargin}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align="center">Status</TableCell>
							<TableCell align="center">VM type</TableCell>
							<TableCell align="center">Number of nodes</TableCell>
							<TableCell align="center">Cloud provider</TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{VMGroups.map((VMGroupItem, i) => {
							return (
								<TableRow key={VMGroupItem.id}>
									<TableCell className={classes.tableNameWidth} component="th" scope="row">{VMGroupItem.name}</TableCell>
									<TableCell align="center">{{
										"removing": <CircularProgress className={classes.errorColor} />,
										"creating": <CircularProgress />,
										"running" : <CheckCircleOutlineIcon className={classes.successColor} />,
										"error" : <ErrorOutlineIcon className={classes.errorColor} />,
										}[VMGroupItem.status] || VMGroupItem.status}
									</TableCell>
									<TableCell align="center" className={classes.tebaleTemplateWidth}>{
										props.VMTypes.map((VMType, i) => {
											return(
												VMGroupItem.vms[0].template === VMType.id
												? (
													<Tooltip
														interactive key={i}
														title={<VMTypeCard VMType={VMType} />}
													>
														<div>{VMType.name}</div>
													</Tooltip>
												)
												: null
											);
										})
									}</TableCell>
									<TableCell align="center">{VMGroupItem.vms.length}</TableCell>
									<TableCell align="center">{
										props.clouds.map((cloud, i) => {
											return(cloud.id === VMGroupItem.vms[0].cloud_provider
												? cloud.name
												: null
											)
										})
									}</TableCell>
									<TableCell align="center">
										<IconButton
											disabled={VMGroupItem.status === 'removing' || VMGroupItem.status === 'creating'
												? true
												: false
											}
											className={classes.deleteIcon}
											onClick={() => {handleDeleteVMGroupWindowOpen(VMGroupItem)}}
											aria-label="delete"
										>
											<DeleteIcon />
										</IconButton>
										<IconButton className={classes.infoIcon}>
											<InfoIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<DeleteVMGroup
				deleteVMGroupWindow={deleteVMGroupWindow}
				setDeleteVMGroupWindow={setDeleteVMGroupWindow}
				selectedVMGroup={selectedVMGroup}
				getVMGroups={props.getVMGroups}
			/>
		</Container>
	);
};
