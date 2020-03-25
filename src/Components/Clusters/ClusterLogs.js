import React, { useEffect, useState } from 'react';
import { Typography, Container, makeStyles, AppBar, Toolbar, CircularProgress } from '@material-ui/core';
import { serverURL } from '../../serverLink';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { commonStyles } from '../../styles/style';
import { useSelector } from 'react-redux';
import { selectCluster } from '../../Actions/ClusterActions';

const useStyles = makeStyles(theme => ({
	logs: {
		fontSize: "12px",
		whiteSpace: "pre-wrap",
		color: "#b3b3b1",
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		marginLeft: theme.spacing(2),
	},
	AppBar: {
		backgroundColor: "#1a1918",
		marginBottom: theme.spacing(2)
	},
}))

export function ClusterLogs (props) {
	const logsEndRef = React.createRef();
	const classes = useStyles();
	const commonClasses = commonStyles();
	const [clusterLog, setClusterLog] = useState("");
	const localStorageSelectedCluster = JSON.parse(localStorage.getItem("selectedCluster"));
	const selectedCluster = useSelector(state => state.selectedCluster);

	const scrollToBottom = () => logsEndRef.current.scrollIntoView(
		localStorageSelectedCluster.status !== "running"  // ! If cluster is running, it will not scroll down
			? {
				behavior: "smooth",
				block: "end"
			}
			: {}

	);
	const showLogs = (cluster,lineNumber) => {
		fetch(`${serverURL}/kubespray/deploy/get/log`,{
			method: 'POST',
			body: JSON.stringify({
				kubespray_deploy_id: cluster.kubespray_deployments[cluster.kubespray_deployments.length - 1].id,
				last_line: lineNumber
			})
		})
		.then(response => response.json())
		.then(data => {
			console.log(data.readed_lines)
			if(data.readed_lines !== ""){
				let temporaryLog = "";
				for (let i = 0; i < data.readed_lines.length; i++) {
					temporaryLog += data.readed_lines[i];
				}
				setClusterLog(prevState => prevState += temporaryLog);
			}
			if(cluster.status === "deploying") {
				setTimeout(() => {showLogs(cluster, data.last_line)}, 1000)
			}
		})
	};
	useEffect(() => {
		props.dispatch(selectCluster(localStorageSelectedCluster))
		showLogs(localStorageSelectedCluster, 0)
	}, []);
	useEffect(scrollToBottom, [clusterLog]);
	useEffect(() => {
		return () => {
			props.dispatch(selectCluster({}));
			setClusterLog("");
		}
	}, [props])

	return (
		<div>
			<AppBar position="static" className={classes.AppBar}>
				<Toolbar>
					{
						selectedCluster.status === "deploying"
							? <CircularProgress />
							: selectedCluster.status ==="running"
								? <CheckCircleOutlineIcon fontSize="large" className={commonClasses.successColor} />
								: selectedCluster.status === "error"
									? <ErrorOutlineIcon className={commonClasses.errorColor} />
									: selectedCluster.status
					}
					<Typography variant="h6" className={classes.title}>{selectedCluster.name}</Typography>
				</Toolbar>
			</AppBar>
			<Container maxWidth="xl" className={classes.containerStyle}>
				<Typography className={classes.logs} ref={logsEndRef}>{clusterLog}</Typography>
			</Container>
		</div>
	)
}
