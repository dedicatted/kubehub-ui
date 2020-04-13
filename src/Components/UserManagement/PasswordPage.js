import React, { useState } from 'react';
import { Container, AppBar, IconButton, makeStyles, Typography, Toolbar, TextField, Grid, InputAdornment } from '@material-ui/core';
import { commonStyles } from '../../styles/style';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
	appBar: {
		backgroundColor: 'white'
	},
	backIcon: {
		marginRight: theme.spacing(1)
	}
}))

export function PasswordPage() {
	const commonClasses = commonStyles();
	const classes = useStyles();
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isPasswordNotSimilarity, setIsPasswordNotSimilarity] = useState(false);
	const [isSamePasswords, setIsSamePasswords] = useState(false);

	const handleCurrentPasswordChange = event => setCurrentPassword(event.target.value);
	const handleNewPasswordChange = event => setNewPassword(event.target.value);
	const handleConfirmNewPassword = event => setConfirmNewPassword(event.target.value);
	const handleClickShowPassword = () => setShowPassword(!showPassword)
	const checkPasswordSimilarity = event => {
		if(event.target.value !== newPassword && event.target.value.length) {
			setIsPasswordNotSimilarity(true);
		} else {
			setIsPasswordNotSimilarity(false);
		}
	}
	const checkSamePasswords = event => {
		if(event.target.value === currentPassword && event.target.value.length) {
			setIsSamePasswords(true);
		} else {
			setIsSamePasswords(false);
		}
	}


	return(
		<React.Fragment>
			<AppBar position='static' className={classes.appBar}>
				<Toolbar>
					<Link to="/user">
						<IconButton className={classes.backIcon}>
							<ArrowBackIcon color='primary' />
						</IconButton>
					</Link>
					<Typography color='primary' variant='h6' >Change password</Typography>
				</Toolbar>
			</AppBar>
			<Container maxWidth='xl' className={commonClasses.container}>
				<TextField
					value={currentPassword}
					onChange={handleCurrentPasswordChange}
					margin="dense"
					id="current-password"
					label="Password"
					fullWidth
					helperText="Enter your current password"
					variant="outlined"
					size="small"
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
					error={isSamePasswords}
					value={newPassword}
					onChange={handleNewPasswordChange}
					margin="dense"
					id="new-password"
					label="Password"
					fullWidth
					onBlur={checkSamePasswords}
					helperText={isSamePasswords ? "The new password is the same as the current one" : "Enter a new password"}
					variant="outlined"
					size="small"
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
					value={confirmNewPassword}
					onChange={handleConfirmNewPassword}
					margin="dense"
					id="next-password"
					label="Password"
					fullWidth
					onBlur={checkPasswordSimilarity}
					helperText={isPasswordNotSimilarity ? 'Password mismatch' : 'Re-enter a new password'}
					variant="outlined"
					size="small"
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
			</Container>
			<Grid
				container
				direction="row"
				justify="flex-end"
				alignItems="center"
			>
				<Link to="/user" className={commonClasses.links}>
					<IconButton className={commonClasses.margin}>
						<CloseIcon color="primary"/>
					</IconButton>
				</Link>
				<Link to="/user" className={isPasswordNotSimilarity || isSamePasswords ? commonClasses.disabledLink : commonClasses.links}>
					<IconButton disabled={isPasswordNotSimilarity || isSamePasswords} className={commonClasses.margin}>
						<DoneIcon color={isPasswordNotSimilarity || isSamePasswords ? 'disabled' : 'primary'}/>
					</IconButton>
				</Link>
			</Grid>
		</React.Fragment>
	)
}
