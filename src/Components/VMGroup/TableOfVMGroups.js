import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, IconButton, Tooltip, TableHead, TableRow, TableContainer, TableCell, TableBody, Table, CircularProgress } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import TemplateCard  from "./TemplateCard";
import DeleteVMGroup from "./DeleteVMGroup";

const useStyles = makeStyles(tehme => ({
	tableMargin: {
		marginBottom: '50px'
	},
	tableNameWidth: {
		width: '17%'
	},
	tebaleTemplateWidth: {
		width: '30%'
	},
	DeleteIcon: {
		'&:hover' : {
			color: '#f44336'
		}
	},
	removingCircularProgress: {
		color: '#f44336'
	}
}));

export function TableOfVMGroup (props) {
	const classes = useStyles();
	const VMGroup = useSelector(state => state.vm_group);
	const [stateVMGroup] = useState(VMGroup);
	const [selectedVMGroup, setSelectedVMGroup] = useState([]);
	const [deleteVMGroupWindow, setDeleteVMGroupWindow] = useState(false);
	useEffect(props.refreshCloudData, [stateVMGroup]);
	useEffect(props.refreshVMGroupData, [stateVMGroup]);
	const handleDeleteVMGroupWindowOpen = (vm_group) => {
		setSelectedVMGroup(vm_group);
		setDeleteVMGroupWindow(true);
	};
	useEffect(() => {
		const interval = setInterval(() => {
			props.refreshVMGroupData()
		}, 4000);
		return () => clearInterval(interval);
	  }, [props]);
	return (
		<div>
			<TableContainer className={classes.tableMargin}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align="center">Template</TableCell>
							<TableCell align="center">Number of nodes</TableCell>
							<TableCell align="center">Cloud provider</TableCell>
							<TableCell align="center">Status</TableCell>
							<TableCell align="center">Actions</TableCell>
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
												VMGroupItem.vms[0].template_id === template.id
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
											return(cloud.id === VMGroupItem.vms[0].cloud_provider_id
												? cloud.name
												: null
											)
										})
									}</TableCell>
									<TableCell align="center">
										{VMGroupItem.status === 'removing' || VMGroupItem.status === 'creating'
											? <CircularProgress className={VMGroupItem.status === 'removing'
												? classes.removingCircularProgress
												: null
											} />
											: VMGroupItem.status
										}
									</TableCell>
									<TableCell align="center">
										<IconButton
											disabled={VMGroupItem.status === 'removing' || VMGroupItem.status === 'creating'
												? true
												: false
											}
											className={classes.DeleteIcon}
											onClick={() => {handleDeleteVMGroupWindowOpen(VMGroupItem)}}
											aria-label="delete"
										>
											<DeleteIcon />
										</IconButton>
										<IconButton>
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
		</div>
	);
};
