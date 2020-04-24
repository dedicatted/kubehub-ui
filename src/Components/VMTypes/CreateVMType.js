import React from 'react';
import { TextField, Button, Container, Typography, Grid, InputAdornment, Breadcrumbs } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { commonStyles } from "../../styles/style";
import { TopBar } from '../TopBar';


export function CreateVMType (props) {
	const commonClasses = commonStyles();
	const [name, setName] = React.useState('');
	const [vCPU, setVCPU] = React.useState('');
	const [memory, setMemory] = React.useState('');

	const handleNameChange = event => setName(event.target.value);
	const handleVCPUChange = event => setVCPU(event.target.value);
	const handleMemoryChange = event => setMemory(event.target.value);

	return (
		<>
			<TopBar backIcon>
				Create VM-type
			</TopBar>
			<Container maxWidth="xl" className={commonClasses.container}>
				<TextField
					value={name}
					onChange={handleNameChange}
					margin="dense"
					id="name"
					label="Name"
					fullWidth
					variant="outlined"
					size="small"
				/>
				<TextField
					margin="dense"
					id="vCPU"
					label="vCPU"
					fullWidth
					value={vCPU}
					onChange={handleVCPUChange}
					variant="outlined"
					size="small"
					InputProps={{
						endAdornment: <InputAdornment position="start">Cores</InputAdornment>,
					}}
				/>
				<TextField
					margin="dense"
					id="memory"
					label="Memory"
					value={memory}
					onChange={handleMemoryChange}
					fullWidth
					variant="outlined"
					size="small"
					helperText="RAM size"
					InputProps={{
						endAdornment: <InputAdornment position="start">GB</InputAdornment>,
					}}
				/>
				<Grid
					container
					direction="row"
					justify="flex-end"
					alignItems="center"
				>
					<Link to="/vm_types" className={commonClasses.links}>
						<Button variant="contained" color="primary" className={commonClasses.margin}>
							Cancel
						</Button>
					</Link>
					<Link to="/vm_types" className={commonClasses.links}>
						<Button variant="contained" color="primary" className={commonClasses.margin}>
							Create
						</Button>
					</Link>
				</Grid>
			</Container>
		</>
	);
};
