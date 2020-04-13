import React from 'react';
import Dropzone from 'react-dropzone';
import { Card, Grid, makeStyles, Typography } from '@material-ui/core';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { UserAppBar } from './UserAppBar';

const useStyles = makeStyles(theme => ({
	photoIcon: {
		fontSize: 100,
	},
	grid: {
		height: '79vh',
	},
	description: {
		color: '#5f6368',
	},
}))

export function PhotoPage() {
	const classes = useStyles();

	return(
		<>
			<UserAppBar title='Select a profile photo' />
			<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
				{({getRootProps, getInputProps}) => (
					<Card {...getRootProps()}>
						<Grid
							container
							direction='column'
							justify='center'
							alignItems='center'
							className={classes.grid}
						>
							<PhotoLibraryIcon className={classes.photoIcon}/>
							<input {...getInputProps()} />
							<Typography className={classes.description}>Drag a photo here or click and select a file on your computer</Typography>
						</Grid>
					</Card>
				)}
			</Dropzone>
		</>
	)
}
