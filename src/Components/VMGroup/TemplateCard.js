import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

export default function TemplateCard (props) {
	return(
		<Card variant="outlined">
			<CardContent>
				<Typography variant="body2" component="p">
					OS: {props.template.name.split('-')[1]}
				</Typography>
				<Typography variant="body2" component="p">
					Number of Cores: {props.template.maxcpu} core
				</Typography>
				<Typography variant="body2" component="p">
					Bootdisk size: {Math.floor(props.template.maxdisk * 10**-9)} GB
				</Typography>
				<Typography variant="body2" component="p">
					RAM: {Math.floor(props.template.maxmem * 10**-9)} GB
				</Typography>
			</CardContent>
		</Card>
	)
}
