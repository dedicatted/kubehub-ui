import React from 'react';
import { TextField, Grid, Button } from '@material-ui/core';
import { commonStyles } from "../../styles/style";

export function SetName (props) {
	const commonClasses = commonStyles();

	const handleNameChange = event => props.setName(event.target.value);
	return (
		<React.Fragment>
			<TextField
				value={props.name}
				onChange={handleNameChange}
				margin="dense"
				id="name"
				label="Name"
				fullWidth
				variant="outlined"
				size="small"
			/>
			<Grid
				container
				direction="row"
				justify="flex-end"
				alignItems="center"
			>
				<Button color="primary" className={commonClasses.margin} onClick={() => {
					props.setActiveStep(prevState => --prevState)
				}}>
					Back
				</Button>
				<Button disabled={!props.name} color="primary" className={commonClasses.margin} onClick={() => {
					props.setActiveStep(prevState => ++prevState)
				}}>
					Next
				</Button>
			</Grid>
		</React.Fragment>
	)
}
