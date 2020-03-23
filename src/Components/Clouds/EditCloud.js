import React from 'react';
import { Button, TextField, Container, Typography, Grid  } from '@material-ui/core';
import { editCloud } from '../../Actions/CloudActions';
import { serverURL } from '../../serverLink';
import { Link } from 'react-router-dom';
import { useStyles } from "../../styles/style";

export function EditCloud (props) {
	const classes = useStyles();

	const editCloudData = () => {
		props.dispatch(editCloud(props.editCP_type, props.editName, props.editCloudIndex));
		fetch(`${serverURL}/api/cloud_providers/edit`,{
			method: 'POST',
			body: JSON.stringify({
				id: props.clouds[props.editCloudIndex].id,
				name: props.editName
			})
		})
	};
	const handleEditNameChange = event => props.setEditName(event.target.value);

	return(
		<Container maxWidth='xl' className={classes.container}>
			<Typography
				gutterBottom
				component="h1"
				align='center'
				className={classes.lable}
			>
				Edit cloud
			</Typography>
			<TextField
				margin="dense"
				id="name"
				label="Name"
				fullWidth
				value={props.editName}
				onChange={handleEditNameChange}
				variant='outlined'
				size='small'
			/>
			<Grid
				container
				direction="row"
				justify="flex-end"
				alignItems="center"
			>
				<Link to='/clouds' className={classes.links}>
					<Button variant="contained" color="primary" className={classes.margin}>
						Cancel
					</Button>
				</Link>
				<Link to='/clouds' className={classes.links}>
					<Button variant="contained" onClick={editCloudData} color="primary" className={classes.margin}>
						Save
					</Button>
				</Link>
			</Grid>
		</Container>
	);
};
