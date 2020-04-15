import React, { useState } from 'react';
import { TopBar } from '../TopBar';
import { TextField, Container, Grid, InputAdornment, IconButton } from '@material-ui/core';
import { commonStyles } from '../../styles/style';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

export function AddUser() {
	const commonClasses = commonStyles();
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isPasswordNotSimilarity, setIsPasswordNotSimilarity] = useState(false);


	const handleNameChange = event => setName(event.target.value);
	const handleSurnameChange = event => setSurname(event.target.value);
	const handleEmailChange = event => setEmail(event.target.value);
	const handlePasswordChange = event => setPassword(event.target.value);
	const handleConfirmPasswordChange = event => setConfirmPassword(event.target.value);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const checkPasswordSimilarity = event => {
		if(event.target.value !== password && event.target.value.length) {
			setIsPasswordNotSimilarity(true);
		} else {
			setIsPasswordNotSimilarity(false);
		}
	}


	return(
		<>
			<TopBar backIcon title='Add user' />
			<Container maxWidth='xl' className={commonClasses.container}>
				<TextField
					id="standard-Name"
					margin="dense"
					label="Name"
					size='small'
					value={name}
					onChange={handleNameChange}
					fullWidth
					variant='outlined'
				/>
				<TextField
					id="standard-Surname"
					margin="dense"
					label="Surname"
					size='small'
					value={surname}
					onChange={handleSurnameChange}
					fullWidth
					variant='outlined'
				/>
				<TextField
					id="standard-Email"
					margin="dense"
					label="E-mail adress"
					size='small'
					value={email}
					onChange={handleEmailChange}
					fullWidth
					variant='outlined'
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
					<IconButton disabled={isPasswordNotSimilarity} className={commonClasses.margin}>
						<DoneIcon color={isPasswordNotSimilarity ? 'disabled' : 'primary'}/>
					</IconButton>
					</Link>
				</Grid>
			</Container>
		</>
	)
}
