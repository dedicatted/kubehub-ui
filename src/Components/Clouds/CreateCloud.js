import React from "react";
import { TextField, MenuItem, Container, Typography, Grid, IconButton } from "@material-ui/core";
import { serverURL } from "../../serverLink";
import { addCloud } from "../../Actions/CloudActions";
import { Link } from "react-router-dom";
import { commonStyles } from "../../styles/style";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import auth from "../Auth/auth";

export default function CreateCloud (props) {
	const commonClasses = commonStyles();
	const [CPType, setCPType] = React.useState("");
	const [name, setName] = React.useState("");
	const [apiEndpoint, setApiEndpoint] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleCPTypeChange = event => setCPType(event.target.value);
	const handleNameChange = event => setName(event.target.value);
	const handleApiEndpointChange = event => setApiEndpoint(event.target.value);
	const handlePasswordChange = event => setPassword(event.target.value);
	const createCloud = () => {
		fetch(`${serverURL}/api/cloud_providers/add`, {
			method: "POST",
			body: JSON.stringify({
				cp_type: CPType,
				name: name,
				api_endpoint: apiEndpoint,
				password: password
			}),
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => {
			if(response.status === 401) {
				auth.refreshToken(createCloud);
				Promise.reject();
			} else {
				return response.json()
			}
		})
		.catch(error => console.error(error));
		props.dispatch(addCloud(CPType,name,apiEndpoint,password));
		setTimeout(props.getClouds,100);
	};

	return (
		<Container maxWidth="xl" className={commonClasses.container}>
			<Typography
				gutterBottom
				component="h1"
				align="center"
				className={commonClasses.lable}
			>
				Create cloud
			</Typography>
			<TextField
				id="standard-select-CP_type"
				select
				label="Type of clouds"
				value={CPType}
				onChange={handleCPTypeChange}
				helperText="Please select your cloud"
				fullWidth
				variant="outlined"
				size="small"
			>
				{props.CP_types.map(CP_type => (
					<MenuItem key={CP_type.value} value={CP_type.value}>
						{CP_type.value}
					</MenuItem>
				))}
			</TextField>
			<TextField
				margin="dense"
				id="name"
				label="Name"
				value={name}
				onChange={handleNameChange}
				fullWidth
				variant="outlined"
				size="small"
			/>
			<TextField
				margin="dense"
				id="api-endpoint"
				label="API-Endpoint"
				value={apiEndpoint}
				onChange={handleApiEndpointChange}
				type="url"
				fullWidth
				variant="outlined"
				size="small"
			/>
			<TextField
				value={password}
				onChange={handlePasswordChange}
				type="password"
				margin="dense"
				id="password"
				label="Password"
				fullWidth
				variant="outlined"
				size="small"
			/>
			<Grid
				container
				direction="row"
				justify="flex-end"
				alignItems="center"
			>
				<Link to="/clouds" className={commonClasses.links}>
					<IconButton className={commonClasses.margin}>
						<CloseIcon color="primary"/>
					</IconButton>
				</Link>
				<Link to="/clouds" className={commonClasses.links}>
					<IconButton className={commonClasses.margin} onClick={createCloud}>
						<DoneIcon color="primary"/>
					</IconButton>
				</Link>
			</Grid>
		</Container>
	);
};
