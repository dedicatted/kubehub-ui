import React from 'react';
import { Button, makeStyles, Container } from '@material-ui/core';
import { CreateCluster } from './CreateCluster';
import { serverURL } from '../Dashboard';
import { useDispatch } from 'react-redux';
import { showVMGroup } from '../../../Actions/VMGroupActions';
import { useRouteMatch, Link, Switch, Route } from 'react-router-dom';

const useStyle = makeStyles({
	links: {
		color: 'black',
		textDecoration: 'none'
	}
})

export function Clusters () {
	const classes = useStyle();
	let { path, url } = useRouteMatch();
	const dispatch = useDispatch();
	const refreshVMGroupData = () => {
		fetch(`${serverURL}/api/proxmox/vm/group/list`)
		.then(response => response.json())
		.then(data => data.vm_group_list)
		.then(data => dispatch(showVMGroup(data)));
	};
	return(
		<div>
			<Switch>
				<Route path={`${path}/create_cluster`}>
					<Container max-widht='xl'>
						<CreateCluster
							refreshVMGroupData={refreshVMGroupData}
						/>
					</Container>
				</Route>
				<Route path={path}>
					<Link to={`${url}/create_cluster`} className={classes.links}>
						<Button variant="contained" color='primary'>Create cluster</Button>
					</Link>
					<div>
						TABLE
					</div>
				</Route>
			</Switch>
		</div>
	)
}
