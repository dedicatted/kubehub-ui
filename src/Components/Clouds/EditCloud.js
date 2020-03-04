import React from 'react';
import { Button, TextField, Container, Typography, makeStyles, Grid  } from '@material-ui/core';
import { editCloud } from '../../Actions/CloudActions';
import { serverURL } from '../Dashboard';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	margin: {
	  marginRight: theme.spacing(1),
	  marginTop: theme.spacing(1),
	},
	lable: {
		fontWeight: "bold",
		textTransform: "uppercase"
	},
	links: {
		color: 'black',
		textDecoration: 'none'
	}
}));

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
	const handleEditNameChange = event => {
		props.setEditName(event.target.value);
	};

	return(
		<Container maxWidth='xl'>
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