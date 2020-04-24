import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Typography, Container } from "@material-ui/core"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import auth from "./auth";
import { Link, useHistory } from 'react-router-dom';

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

export default function SignIn(props) {
	const classes = useStyles();
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const handleEmailChange = event => setEmail(event.target.value);
	const handlePasswordChange = event => setPassword(event.target.value);
	return (
		<Container component="main" maxWidth="xs" >
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
						value={email}
						onChange={handleEmailChange}
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="password"
						value={password}
						onChange={handlePasswordChange}
						name="password"
						label="Password"
						type="password"
						autoComplete="current-password"
					/>
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="center"
					>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						{error
							? <Typography align='center' color='error' variant='body1'>Wrong email or password</Typography>
							: null
						}
					</Grid>

					<Button
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={() => {
							auth.login(email, password, () => {
								history.push("/");
							})
							.catch(() => setError(true))
						}}
					>
						Sign In
					</Button>
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="center"
					>
							<Link to="/forgot_password" variant="body2" className={classes.link}>
								Forgot password?
							</Link>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
