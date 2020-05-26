import React from 'react';
import { Grid, makeStyles, Card, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { serverURL } from '../../serverLink';
import auth from '../Auth/auth';
import { addVboxImages } from '../../Actions/VboxImagesActions';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	card: {
		padding: theme.spacing(4),
		"&:hover" : {
			boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
			cursor: 'pointer'
		}
	}
}))


export function ChoseCloud (props) {
	const classes = useStyles();
	const clouds = useSelector(state => state.clouds);
	const dispatch = useDispatch();

	const getVboxImages = () => {
		fetch(`${serverURL}/api/virtualbox/vbox_img/list`, {
			method: 'GET',
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => {
			if(response.status === 401) {
				auth.refreshToken(getVboxImages);
				Promise.reject();
			} else {
				return response.json()
			}
		})
		.then(data => dispatch(addVboxImages(data.vbox_images_list)))
		.catch(error => console.error(error))
	}

	const handleCPTypeChange = cloud => {
		props.setCPType(cloud);
		if(cloud.cp_type === "VirtualBox") {
			fetch(`${serverURL}/api/virtualbox/vbox_img/add`, {
				method: 'POST',
				body: JSON.stringify({
					cloud_provider_id: cloud.id
				}),
				headers: {
					'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
				},
			})
			.then(response => {
				if(response.status === 401) {
					auth.refreshToken(handleCPTypeChange(cloud));
					Promise.reject();
				} else {
					return response.json()
				}
			})
			.then(() => getVboxImages())
			.catch(error => console.error(error))
		}
	};
	return (
		<Grid
			className={classes.root}
			container
			spacing={5}
			justify={
				clouds.length
					? null
					: 'center'
			}
			alignItems={
				clouds.length
					? null
					: 'center'
			}
		>
			{
				clouds.length
					? (
						clouds.map((cloud, i) => (
							<Grid key={i} item xs={3}>
								<Card key={i} className={classes.card} onClick={() => {
									handleCPTypeChange(cloud);
									props.setActiveStep(prevState => ++prevState)
								}}>
									<Typography variant='body1' align='center'>{cloud.name}</Typography>
									<Typography variant='body2' align='center'>{cloud.cp_type}</Typography>
								</Card>
							</Grid>
						))
					)
					: (
						<Typography style={{paddingTop: '15%'}}>You have no clouds :(</Typography>
					)
			}
		</Grid>
	)
}
