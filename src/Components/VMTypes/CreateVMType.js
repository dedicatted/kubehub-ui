import React from 'react';
import { TextField, Button, Container, Grid, InputAdornment } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { commonStyles } from "../../styles/style";
import { TopBar } from '../TopBar';
import { useDispatch } from 'react-redux';
import { addVMType } from '../../Actions/VMTypesActions';
import { serverURL } from '../../serverLink';
import auth from '../Auth/auth';


export function CreateVMType (props) {
	const commonClasses = commonStyles();
	const dispatch = useDispatch();
	const [name, setName] = React.useState('');
	const [vCPU, setVCPU] = React.useState(0);
	const [memory, setMemory] = React.useState(0);
	const [bootDisk, setBootDisk] = React.useState(0);

	const handleNameChange = event => setName(event.target.value);
	const handleVCPUChange = event => setVCPU(event.target.value);
	const handleMemoryChange = event => setMemory(event.target.value);
	const handleBootDiskChange = event => setBootDisk(event.target.value);

	const createVMType = () => {
		fetch(`${serverURL}/api/kubehub/vm-type/add`, {
			method: 'POST',
			body: JSON.stringify({
				name,
				cores: vCPU,
				memory: memory,
				boot_disk: bootDisk,
			}),
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => {
			if(response.status === 401) {
				auth.refreshToken(createVMType);
			} else {
				return response.json()
			}
		})
		.then(() => dispatch(addVMType({
			name,
			vCPU,
			memory,
			bootDisk
		})))

	}
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
					id="boot-disk"
					label="Boot Disk"
					value={bootDisk}
					onChange={handleBootDiskChange}
					fullWidth
					type='number'
					variant="outlined"
					size="small"
					InputProps={{
						endAdornment: <InputAdornment position="start">GB</InputAdornment>,
					}}
				/>
				<TextField
					margin="dense"
					id="memory"
					label="Memory"
					value={memory}
					onChange={handleMemoryChange}
					fullWidth
					type='number'
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
						<Button color="primary" className={commonClasses.margin}>
							Cancel
						</Button>
					</Link>
					<Link to="/vm_types" className={commonClasses.links}>
						<Button color="primary" className={commonClasses.margin} onClick={createVMType}>
							Create
						</Button>
					</Link>
				</Grid>
			</Container>
		</>
	);
};
