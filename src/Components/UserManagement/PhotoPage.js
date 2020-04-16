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
			<TopBar backIcon title='Select a profile photo' />
			<Dropzone
				onDrop={acceptedFiles => console.log(acceptedFiles)}
				accept='image/jpeg, image/png'
			>
				{({getRootProps, getInputProps, isDragActive, isDragReject, acceptedFiles}) => (
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
							<Box className={classes.description}>
								{!isDragActive && (
									<Box>
										<Typography>Click here or drop a file to upload!</Typography>
										<Typography>Accepted types: jpeg, png!</Typography>
									</Box>
								)}
								{isDragActive && !isDragReject && <Typography>Drop it like it's hot!</Typography>}
								{isDragReject && <Typography>File type not accepted, sorry!</Typography>}
								{acceptedFiles[0] && acceptedFiles[0].name}
							</Box>
						</Grid>
					</Box>
				)}
			</Dropzone>
		</React.Fragment>
	)
}
