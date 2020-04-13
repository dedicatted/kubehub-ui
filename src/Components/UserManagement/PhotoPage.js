import React from 'react';
import Dropzone from 'react-dropzone';
import { Card, Grid, makeStyles, Typography } from '@material-ui/core';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

const useStyles = makeStyles(theme => ({
	photoIcon: {
		fontSize: 100,
	},
	grid: {
		height: '89.5vh',
	},
	description: {
		color: '#5f6368',
	},
}))

export function PhotoPage() {
	const classes = useStyles();

	return(
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
	)
}
