import React from "react";
import { TextField, Button, MenuItem, Container, Typography, Grid } from "@material-ui/core";
import { serverURL } from "../../serverLink";
import { addCloud } from "../../Actions/CloudActions";
import { Link } from "react-router-dom";
import { useStyles } from "../../styles/style";

export default function CreateCloud (props) {
	const classes = useStyles();
	const [CP_type, setCP_type] = React.useState("AWS");
	const [name, setName] = React.useState("");
	const [api_endpoint, setApiEndpoint] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleCP_typeChange = event => setCP_type(event.target.value);
	const handleNameChange = event => setName(event.target.value);
	const handleApiEndpointChange = event => setApiEndpoint(event.target.value);
	const handlePasswordChange = event => setPassword(event.target.value);
	const createCloud = () => {
		fetch(`${serverURL}/api/cloud_providers/add`, {
			method: "POST",
			body: JSON.stringify({
				cp_type: CP_type,
				name: name,
				api_endpoint: api_endpoint,
				password: password
			})
		})
		props.dispatch(addCloud(CP_type,name,api_endpoint,password));
		setTimeout(props.refreshCloudData,100);
	};

	return (
		<Container maxWidth="xl">
			<Typography
				gutterBottom
				component="h1"
				align="center"
				className={classes.lable}
			>
				Create cloud
			</Typography>
			<TextField
				id="standard-select-CP_type"
				select
				label="Type of clouds"
				value={CP_type}
				onChange={handleCP_typeChange}
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
				value={api_endpoint}
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
				<Link to="/clouds" className={classes.links}>
					<Button variant="contained" color="primary" className={classes.margin}>
						Cancel
					</Button>
				</Link>
				<Link to="/clouds" className={classes.links}>
					<Button variant="contained" onClick={createCloud} color="primary" className={classes.margin}>
						Create
					</Button>
				</Link>
			</Grid>
		</Container>
	);
};
