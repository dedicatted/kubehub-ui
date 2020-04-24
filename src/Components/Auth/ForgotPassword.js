import React from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container, makeStyles } from "@material-ui/core"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	link: {
		textDecoration: 'none',
		color: "blue"
	},
}));

export function ForgotPassword() {
	const classes = useStyles();

	return(
		<Container component="main" maxWidth="xs" style={{position: 'relative'}}>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="center"
					>
						<Link to='./sign_in' className={classes.link}>
							<Button
								variant="contained"
								color="primary"
								className={classes.submit}
							>
								Cancel
							</Button>
						</Link>
						<Button
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={() => {}}
						>
							Send
						</Button>
					</Grid>
				</form>
			</div>
		</Container>
	)
}
