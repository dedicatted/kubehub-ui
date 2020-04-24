import React, { useEffect, useState	 } from 'react';
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
	},
	title: {
		flexGrow: 1,
		marginLeft: theme.spacing(2),
	},
	AppBar: {
		backgroundColor: "#1a1918",
	},
	allLog: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	stringNumber: {
		marginRight: "2%",
		textAlign: "right",
		width: "1%",
		display: "inline-block",
		fontWeight: "lighter"
	}
}))

export function ClusterLogs (props) {
	const classes = useStyles();
	const commonClasses = commonStyles();
	const logsEndRef = React.createRef();
	const [clusterLog, setClusterLog] = useState([]);
	const localStorageSelectedCluster = JSON.parse(localStorage.getItem("selectedCluster"));
	const selectedCluster = useSelector(state => state.selectedCluster);

	const scrollToBottom = () => {
		if (localStorageSelectedCluster.status === "deploying") {
			logsEndRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end"
			});
		}
	};
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
			if(data.readed_lines !== ""){
				let temporaryLog = [];
				for (let i = 0; i < data.readed_lines.length; i++) {
					temporaryLog.push(data.readed_lines[i])
				}
				setClusterLog(prevState => prevState.concat(temporaryLog));
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
	useEffect(() => {
		return () => {
			props.dispatch(selectCluster({}));
			setClusterLog([]);
		}
	}, [])
	useEffect(scrollToBottom, [clusterLog]);

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
			<Container maxWidth="xl" id="scrollToBottom" className={classes.containerStyle}>
				<div className={classes.allLog} ref={logsEndRef}>
					{clusterLog.map((log, i) => (
						<div key={i}>
							<Typography className={classes.logs}>
								<span className={classes.stringNumber}>{++i}</span>
								{log}
							</Typography>
						</div>
					))}
				</div>
			</Container>
		</div>
	)
}
