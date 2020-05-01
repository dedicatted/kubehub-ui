import React, { useState } from 'react';
import { TopBar } from '../TopBar';
import { TextField, Container, Grid, InputAdornment, IconButton, Checkbox, FormControlLabel } from '@material-ui/core';
import { commonStyles } from '../../styles/style';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { serverURL } from '../../serverLink';
import auth from '../Auth/auth';

export function AddUser(props) {
	const commonClasses = commonStyles();
	const [name, setName] = useState('');
	const [lastname, setLastname] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isPasswordNotSimilarity, setIsPasswordNotSimilarity] = useState(false);
	const [adminStatus, setAdminStatus] = useState(false);

	const handleNameChange = event => setName(event.target.value);
	const handleUsernameStatus = event => setUsername(event.target.value);
	const handleLastnameChange = event => setLastname(event.target.value);
	const handleEmailChange = event => setEmail(event.target.value);
	const handlePasswordChange = event => setPassword(event.target.value);
	const handleConfirmPasswordChange = event => setConfirmPassword(event.target.value);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleAdminStatus = () => setAdminStatus(!adminStatus);
	const checkPasswordSimilarity = event => {
		if(event.target.value !== password && event.target.value.length) {
			setIsPasswordNotSimilarity(true);
		} else {
			setIsPasswordNotSimilarity(false);
		}
	}
	const addUser = () => {
		fetch(`${serverURL}/api/auth/account/add`, {
			method: 'POST',
			body: JSON.stringify({
				username,
				email,
				password,
				password2: confirmPassword,
				first_name: name,
				last_name: lastname,
				is_admin: adminStatus
			}),
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => {
			if(response.status === 401) {
				auth.refreshToken(addUser); //! Need to test
				Promise.reject();
			} else {
				return response.json()
			}
		})
		.then(props.getUsersData)
		.catch(error => console.log(error));
	}

	return(
		<>
			<TopBar backIcon title='Add user' />
			<Container maxWidth='xl' className={commonClasses.container}>
				<TextField
					id="standard-Username"
					margin="dense"
					label="Username"
					size='small'
					value={username}
					onChange={handleUsernameStatus}
					fullWidth
					variant='outlined'
					required
				/>
				<Grid
					container
					justify='space-between'
				>
					<TextField
						id="standard-Name"
						margin="dense"
						label="Name"
						size='small'
						value={name}
						onChange={handleNameChange}
						style={{width: '48%'}}
						variant='outlined'
					/>
					<TextField
						id="standard-Lastname"
						margin="dense"
						label="Lastname"
						size='small'
						value={lastname}
						onChange={handleLastnameChange}
						style={{width: '48%'}}
						variant='outlined'
					/>
				</Grid>
				<TextField
					id="standard-Email"
					margin="dense"
					label="E-mail adress"
					size='small'
					value={email}
					onChange={handleEmailChange}
					fullWidth
					variant='outlined'
					required
				/>
				<TextField
					id="standard-Password"
					margin="dense"
					label="Password"
					size='small'
					value={password}
					onChange={handlePasswordChange}
					helperText={"Enter a password"}
					fullWidth
					variant='outlined'
					type={showPassword ? 'text' : 'password'}
					InputProps={{
						endAdornment: <InputAdornment position="start">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
						  	>
								{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
						  </IconButton>
						</InputAdornment>,
					}}
					required
				/>
				<TextField
					error={isPasswordNotSimilarity}
					id="standard-Confirm-Password"
					margin="dense"
					label="Re-enter password"
					size='small'
					value={confirmPassword}
					onChange={handleConfirmPasswordChange}
					onBlur={checkPasswordSimilarity}
					helperText={isPasswordNotSimilarity ? 'Password mismatch' : 'Re-enter a new password'}
					fullWidth
					variant='outlined'
					type={showPassword ? 'text' : 'password'}
					InputProps={{
						endAdornment: <InputAdornment position="start">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
						  	>
								{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
						  </IconButton>
						</InputAdornment>,
					}}
					required
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={adminStatus}
							onChange={handleAdminStatus}
							color='primary'
							label='Admin status'
						/>
					}
					label='Give admin status'
				/>

				<Grid
					container
					direction="row"
					justify="flex-end"
					alignItems="center"
				>
					<Link to="/users" className={commonClasses.links}>
						<IconButton className={commonClasses.margin}>
							<CloseIcon color="primary"/>
						</IconButton>
					</Link>
					<Link to="/users" className={commonClasses.links} >
						<IconButton disabled={isPasswordNotSimilarity} className={commonClasses.margin} onClick={addUser}>
							<DoneIcon color={isPasswordNotSimilarity ? 'disabled' : 'primary'}/>
						</IconButton>
					</Link>
				</Grid>
			</Container>
		</>
	)
}
