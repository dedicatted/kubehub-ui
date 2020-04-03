import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

export default function VMTypeCard (props) {
	return(
		<Card variant="outlined">
			<CardContent>
				<Typography variant="body2" component="p">
					OS: {props.VMType.name.split('-')[1]}
				</Typography>
				<Typography variant="body2" component="p">
					Number of Cores: {props.VMType.maxcpu} core
				</Typography>
				<Typography variant="body2" component="p">
					Bootdisk size: {Math.floor(props.VMType.maxdisk * 10**-9)} GB
				</Typography>
				<Typography variant="body2" component="p">
					RAM: {Math.floor(props.VMType.maxmem * 10**-9)} GB
				</Typography>
			</CardContent>
		</Card>
	)
}
