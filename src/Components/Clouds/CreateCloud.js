import React from "react";
import { TextField, Button, MenuItem, Container, Typography, Grid } from "@material-ui/core";
import { serverURL } from "../../serverLink";
import { addCloud } from "../../Actions/CloudActions";
import { Link } from "react-router-dom";
import { commonStyles } from "../../styles/style";

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
			})
		})
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
					<Button variant="contained" color="primary" className={commonClasses.margin}>
						Cancel
					</Button>
				</Link>
				<Link to="/clouds" className={commonClasses.links}>
					<Button variant="contained" onClick={createCloud} color="primary" className={commonClasses.margin}>
						Create
					</Button>
				</Link>
			</Grid>
		</Container>
	);
};
