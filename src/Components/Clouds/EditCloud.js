import React from 'react';
import { Button, TextField, Container, Typography, Grid  } from '@material-ui/core';
import { editCloud } from '../../Actions/CloudActions';
import { serverURL } from '../../serverLink';
import { Link } from 'react-router-dom';
import { commonStyles } from "../../styles/style";

export function EditCloud (props) {
	const commonClasses = commonStyles();

	const submitEditedData = () => {
		props.dispatch(editCloud(props.editableName, props.editableCloudIndex));
		fetch(`${serverURL}/api/cloud_providers/edit`,{
			method: 'POST',
			body: JSON.stringify({
				id: props.clouds[props.editableCloudIndex].id,
				name: props.editableName
			}),
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
	};
	const handleEditableNameChange = event => props.setEditableName(event.target.value);

	return(
		<Container maxWidth='xl' className={commonClasses.container}>
			<Typography
				gutterBottom
				component="h1"
				align='center'
				className={commonClasses.lable}
			>
				Edit cloud
			</Typography>
			<TextField
				margin="dense"
				id="name"
				label="Name"
				fullWidth
				value={props.editableName}
				onChange={handleEditableNameChange}
				variant='outlined'
				size='small'
			/>
			<Grid
				container
				direction="row"
				justify="flex-end"
				alignItems="center"
			>
				<Link to='/clouds' className={commonClasses.links}>
					<Button variant="contained" color="primary" className={commonClasses.margin}>
						Cancel
					</Button>
				</Link>
				<Link to='/clouds' className={commonClasses.links}>
					<Button variant="contained" onClick={submitEditedData} color="primary" className={commonClasses.margin}>
						Save
					</Button>
				</Link>
			</Grid>
		</Container>
	);
};
