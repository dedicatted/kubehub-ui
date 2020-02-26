import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, IconButton, Tooltip, TableHead, TableRow, TableContainer, TableCell, TableBody, Table } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import TemplateCard  from "./TemplateCard";
const useStyles = makeStyles(thme => ({
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
	}
}));

export function TableOfVMGroup (props) {
	const classes = useStyles();
	const VMGroup = useSelector(state => state.vm_group);
	const [stateVMGroup] = useState(VMGroup);
	useEffect(props.refreshCloudData, [stateVMGroup]);
	useEffect(props.refreshVMGroupData, [stateVMGroup]);
	
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
							console.log(VMGroupItem);
							return (
								<TableRow key={VMGroupItem.id}>
									<TableCell className={classes.tableNameWidth} component="th" scope="row">{VMGroupItem.name}</TableCell>
									<TableCell align="center" className={classes.tebaleTemplateWidth}>{
										props.templates.map((template, i) => {
											return(
												VMGroupItem.vms[0].template_id === template.id ? (
													<Tooltip
														interactive key={i}
														title={<TemplateCard template={template}/>}
													>
														<div>{template.name}</div>
													</Tooltip>
												) : null
											);
										})
									}</TableCell>
									<TableCell align="center">{VMGroupItem.vms.length}</TableCell>
									<TableCell align="center">{
										props.clouds.map((cloud, i) => {
											return(cloud.id === VMGroupItem.vms[0].cloud_provider_id ? cloud.name : null)
										})
									}</TableCell>
									<TableCell align="center">Ready</TableCell>
									<TableCell align="center">
										<IconButton className={classes.DeleteIcon} aria-label="delete">
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
		</div>
	);
};
