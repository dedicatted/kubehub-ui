import React from 'react';
import Dropzone from 'react-dropzone';
import { Grid, makeStyles, Typography, Box } from '@material-ui/core';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { TopBar } from '../TopBar';

const useStyles = makeStyles(theme => ({
	photoIcon: {
		fontSize: 100,
	},
	grid: {
		height: '100%',
	},
	description: {
		color: '#5f6368',
	},
	card: {
		height: '79%',
	},
}))

export function PhotoPage() {
	const classes = useStyles();

	return(
		<React.Fragment>
			<TopBar backIcon link='/user' title='Select a profile photo' />
			<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
				{({getRootProps, getInputProps}) => (
					<Box {...getRootProps()} className={classes.card}>
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
					</Box>
				)}
			</Dropzone>
		</React.Fragment>
	)
}
