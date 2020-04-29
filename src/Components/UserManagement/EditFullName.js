import React, { useState } from 'react';
import { Dialog, DialogTitle, TextField, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	mt2: {
		marginTop: theme.spacing(2)
	},
}));

export default function EditFullName (props) {
	const [name, setName] = useState(props.user.name);
	const [surname, setSurname] = useState(props.user.surname);
	const classes = useStyles();

	const handleChangeName = event => setName(event.target.valuer);
	const handleChangeSurname = event => setSurname(event.target.valuer);

	return (
		<Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Change Name</DialogTitle>
			<DialogContent>
				<TextField
					label="Name"
					value={name}
					onChange={handleChangeName}
					fullWidth
				/>
				<TextField
					label="Surname"
					value={surname}
					onChange={handleChangeSurname}
					fullWidth
					className={classes.mt2}
				/>
			</DialogContent>
			<DialogActions>
				<Button color="primary" onClick={props.handleClose}>
					Cancel
				</Button>
				<Button color="primary">
					Done
				</Button>
			</DialogActions>
		</Dialog>
	)
}
