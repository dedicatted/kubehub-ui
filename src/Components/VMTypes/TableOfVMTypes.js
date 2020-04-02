import React from 'react';
import { Container, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import { commonStyles } from "../../styles/style";
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';

export function TableOfVMTypes () {
	const classes = commonStyles();
	let { url } = useRouteMatch();
	const VMTypes = useSelector(state => state.VMTypes);

	return (
		<Container maxWidth="xl" className={classes.container}>
			<Link to={`${url}/create_vm_type`} className={classes.links}>
				<Button variant="contained" color='primary'>Create VM type</Button>
			</Link>
			<TableContainer className={classes.tableMargin}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align="center">vCPU</TableCell>
							<TableCell align="center">Memory</TableCell>
							<TableCell align="center">Storage</TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{VMTypes.map(VMType => {
							return (
								<TableRow key={VMTypes.id}>
									<TableCell className={classes.tableNameWidth} component="th" scope="row">{VMType.name}</TableCell>
									<TableCell align="center">{VMType.maxcpu}</TableCell>
									<TableCell align="center">{Math.floor(VMType.maxmem * 10**-9)} GB</TableCell>
									<TableCell align="center">{Math.floor(VMType.maxdisk * 10**-9)} GB</TableCell>
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
	);
}
