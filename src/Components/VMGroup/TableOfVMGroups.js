import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IconButton, Tooltip, TableHead, TableRow, TableContainer, TableCell, TableBody, Table, CircularProgress, Container, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import TemplateCard  from "./TemplateCard";
import DeleteVMGroup from "./DeleteVMGroup";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { commonStyles } from "../../styles/style";
import { Link, useRouteMatch } from 'react-router-dom';

export function TableOfVMGroup (props) {
	const classes = commonStyles();
	const VMGroup = useSelector(state => state.vm_group);
	const [stateVMGroup] = useState(VMGroup);
	const [selectedVMGroup, setSelectedVMGroup] = useState([]);
	const [deleteVMGroupWindow, setDeleteVMGroupWindow] = useState(false);
	let { url } = useRouteMatch();

	const handleDeleteVMGroupWindowOpen = (vm_group) => {
		setSelectedVMGroup(vm_group);
		setDeleteVMGroupWindow(true);
	};

	useEffect(props.refreshVMGroupData, [stateVMGroup]);
	useEffect(() => {
		const interval = setInterval(() => {
			props.refreshVMGroupData();
		}, 4000);
		return () => clearInterval(interval);
	  }, [props]);

	return (
		<Container maxWidth="xl" className={classes.container}>
			<Link to={`${url}/create_vm_group`} className={classes.links}>
				<Button variant="contained" color='primary' onClick={() => {props.refreshCloudData()}}>Create VM group</Button>
			</Link>
			<TableContainer className={classes.tableMargin}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align="center">Template</TableCell>
							<TableCell align="center">Number of nodes</TableCell>
							<TableCell align="center">Cloud provider</TableCell>
							<TableCell align="center">Status</TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{VMGroup.map((VMGroupItem, i) => {
							return (
								<TableRow key={VMGroupItem.id}>
									<TableCell className={classes.tableNameWidth} component="th" scope="row">{VMGroupItem.name}</TableCell>
									<TableCell align="center" className={classes.tebaleTemplateWidth}>{
										props.templates.map((template, i) => {
											return(
												VMGroupItem.vms[0].template === template.id
												? (
													<Tooltip
														interactive key={i}
														title={<TemplateCard template={template} />}
													>
														<div>{template.name}</div>
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
										{VMGroupItem.status === 'removing' || VMGroupItem.status === 'creating'
											? <CircularProgress className={VMGroupItem.status === 'removing'
												? classes.errorColor
												: null
											} />
											: VMGroupItem.status ==="running"
												? <CheckCircleOutlineIcon className={classes.successColor} />
												: VMGroupItem.status === "error"
													? <ErrorOutlineIcon className={classes.errorColor} />
													: VMGroupItem.status
										}
									</TableCell>
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
				refreshVMGroupData={props.refreshVMGroupData}
				VMGroup={VMGroup}
			/>
		</Container>
	);
};
