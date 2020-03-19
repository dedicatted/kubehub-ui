import React, { useEffect } from 'react';
import { Typography, Container, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
	logs: {
		fontSize: "14px",
		whiteSpace: 'pre-wrap'
	}
})

export function ClusterLogs (props) {
	const logsEndRef = React.createRef();
	const classes = useStyles();
	const clusterLog = useSelector(state => state.clusterLog);

	const scrollToBottom = () => logsEndRef.current.scrollIntoView({
		behavior: "smooth",
		block: "end"
	});

	useEffect(scrollToBottom, [clusterLog]);
	return (
		<Container maxWidth="xl" className={classes.typographywidht}>
			<Typography className={classes.logs} noWrap ref={logsEndRef}>{clusterLog}</Typography>
		</Container>
	)
}
