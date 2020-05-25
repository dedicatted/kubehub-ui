import React from 'react';
import { Grid, makeStyles, Card, Typography } from '@material-ui/core';

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

const CP_types = [
	{
		name: 'AWS'
	},
	{
		name: 'GCP'
	},
	{
		name: 'Proxmox'
	},
	{
		name: 'VirtualBox'
	}
];

export function ChoseCPtype (props) {
	const classes = useStyles();

	const handleCPTypeChange = cloud => props.setCPType(cloud);
	return (
		<Grid
			className={classes.root}
			container
			spacing={5}
		>
			{
				CP_types.map((cloud, i) => (
					<Grid key={i} item xs={3}>
						<Card key={i} className={classes.card} onClick={() => {
							handleCPTypeChange(cloud.name);
							props.setActiveStep(prevState => ++prevState)
						}}>
							<Typography variant='body1' align='center'>{cloud.name}</Typography>
						</Card>
					</Grid>
				))

			}
		</Grid>
	)
}
