import React from 'react';
import { Grid, makeStyles, Card, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

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

	const handleCPTypeChange = cloud => props.setCPType(cloud);
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
