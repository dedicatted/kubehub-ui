import React from 'react';
import { Container, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import { commonStyles } from "../../styles/style";
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { TopBar } from '../TopBar';

export function TableOfVMTypes () {
	const classes = commonStyles();
	let { url } = useRouteMatch();
	const VMTypes = useSelector(state => state.VMTypes);

	return (
		<>
			<TopBar>VM-Types</TopBar>
			<Container maxWidth="xl" className={classes.container}>
				<Link to={`${url}/create_vm_type`} className={classes.links}>
					<Button
						color='primary'
						startIcon={<AddIcon />}
					>Create VM-type</Button>
				</Link>
				<TableContainer className={classes.tableMargin}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell align="center">vCPU</TableCell>
								<TableCell align="center">Memory</TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{VMTypes.map((VMType, i) => {
								return (
									<TableRow key={i}>
										<TableCell className={classes.tableNameWidth} component="th" scope="row">{VMType.name}</TableCell>
										<TableCell align="center">
											{VMType.vCPU}
											{
												VMType.vCPU >= 2
													? ' Cores'
													: ' Core'
											}
											</TableCell>
										<TableCell align="center">{VMType.memory} GB</TableCell>
										<TableCell align="center">
											<IconButton
												className={classes.deleteIcon}
												aria-label="delete"
											>
												<DeleteIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	);
}
