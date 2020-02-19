import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import { useSelector } from 'react-redux';
import { makeStyles, IconButton, Tooltip, Card, CardContent, Typography, TableHead, TableRow, TableContainer, TableCell, TableBody, Table } from '@material-ui/core';

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
}))
export function TableOfVMGroup (props) {
	const classes = useStyles();
	const VMGroup = useSelector(state => state.vm_group);
	const clouds = useSelector(state => state.clouds);
	const [stateVMGroup, setStateVMGroup] = useState(VMGroup);
	const templateDescription = template => {
		return(
			<Card variant="outlined" className={classes.CardStyle}>
				<CardContent>
					<Typography variant="body2" component="p">
						OS: {template.name.split('-')[1]}
					</Typography>
					<Typography variant="body2" component="p">
						Number of Cores: {template.maxcpu} core
					</Typography>
					<Typography variant="body2" component="p">
						Bootdisk size: {Math.floor(template.maxdisk * 10**-9)} GB
					</Typography>
					<Typography variant="body2" component="p">
						RAM: {Math.floor(template.maxmem * 10**-9)} GB
					</Typography>
				</CardContent>
			</Card>
		)
	}
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
							console.log(VMGroupItem[i]);
							return (
								<TableRow key={i}>
									<TableCell className={classes.tableNameWidth} component="th" scope="row">{VMGroupItem.name}</TableCell>
									<TableCell align="center" className={classes.tebaleTemplateWidth}>{
										props.templates.map((template, i) => {
											return(VMGroupItem.vms[0].template_id === template.id ? <Tooltip title={templateDescription(template)}><div>{template.name}</div></Tooltip> : null)
										})
									}</TableCell>
									<TableCell align="center">{VMGroupItem.vms.length}</TableCell>
									<TableCell align="center">{
										clouds.map((cloud, i) => {
											return(cloud.id === VMGroupItem.vms[0].cloud_provider_id ? cloud.name : null)
										})
									}</TableCell>
									<TableCell align="center">Ready</TableCell>
									<TableCell align="center">
										<IconButton aria-label="delete">
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
	)
}
