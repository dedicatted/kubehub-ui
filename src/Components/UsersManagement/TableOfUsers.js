import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Container, Button, Checkbox, makeStyles, Fab, Grid, IconButton } from '@material-ui/core';
import { commonStyles } from '../../styles/style';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import { TopBar } from '../TopBar';
import AddIcon from '@material-ui/icons/Add';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import BlockIcon from '@material-ui/icons/Block';
import DeleteIcon from '@material-ui/icons/Delete';
import { serverURL } from '../../serverLink';
import auth from '../Auth/auth';

const useStyles = makeStyles(theme => ({
	fab: {
		position: 'absolute',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
		maxWidth: "200px"
	},
	openDialog: {
		backgroundColor: "#e0e0e0"
	}
}))

export function TableOfUsers(props) {
	const commonClasses = commonStyles();
	const classes = useStyles();
	const users = useSelector(state => state.users)
	const [DeleteMenu, setDeleteMenu] = useState(false);
	const [ArrayOfDeletedUsers, setArrayOfDeletedUsers] = useState([]);
	let { url } = useRouteMatch();

	const showDeleteMenu = () => {
		setDeleteMenu(true);
	}
	const hideDeleteMenu = () => {
		setDeleteMenu(false);
		setArrayOfDeletedUsers([]);
	}
	const onChangeDeleteCheckbox = event => {
		if (event.target.checked) {
			setArrayOfDeletedUsers(oldArray => [...oldArray, event.target.value])
		} else if(!event.target.checked) {
			setArrayOfDeletedUsers(oldArray => oldArray.filter(item => item !== event.target.value))
		}
	}
	const deleteUser = (userId) => {
		fetch(`${serverURL}/api/auth/account/remove`, {
			method: 'POST',
			body: JSON.stringify({
				id: userId
			}),
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(response => {
			if(response.status === 401) {
				auth.refreshToken(deleteUser(userId));
				Promise.reject()
			} else {
				return response.json()
			}
		})
		.then(props.getUsersData)
		.catch(error => console.log(error));
	}
	useEffect(() => {
		const interval = setInterval(() => {
			props.getUsersData();
		}, 4000);
		return () => clearInterval(interval);
	}, [props.getUsersData, props]);

	return(
		<>
			<TopBar title='Users management' />
			<Container maxWidth="xl" className={commonClasses.container}>
				<Link to={`${url}/add_user`} className={commonClasses.links}>
					<Button
						color='primary'
						startIcon={<AddIcon />}
					>
						Add user
					</Button>
				</Link>

				<Button
					color='primary'
					startIcon={<DeleteOutlineIcon />}
					onClick={showDeleteMenu}
					className={DeleteMenu ? classes.openDialog : null}
				>
					Delete
				</Button>

				<TableContainer>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								{DeleteMenu
									? (<TableCell></TableCell>)
									: null
								}
								<TableCell>Username</TableCell>
								<TableCell align="center">E-mail</TableCell>
								<TableCell align="center">Admin</TableCell>
								<TableCell align="center">Staff</TableCell>
								<TableCell align="center">Superuser</TableCell>
								<TableCell align="center">Active account</TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((user, i) => {
								return (
									<TableRow key={i}>
										{DeleteMenu
											? (<TableCell>
													<Checkbox
														value={user.id}
														color="primary"
														onChange={onChangeDeleteCheckbox}
													/>
												</TableCell>
											)
											: null
										}
										<TableCell component="th" scope="row">{user.username}</TableCell>
										<TableCell align="center">{user.email}</TableCell>
										<TableCell align="center">{
											user.is_admin
												? (<CheckCircleOutlineIcon className={commonClasses.successColor}  />)
												: (<BlockIcon className={commonClasses.errorColor}/>)
										}</TableCell>
										<TableCell align="center">{
											user.is_staff
												? (<CheckCircleOutlineIcon className={commonClasses.successColor}  />)
												: (<BlockIcon className={commonClasses.errorColor}/>)
										}</TableCell>
										<TableCell align="center">{
											user.is_superuser
												? (<CheckCircleOutlineIcon className={commonClasses.successColor}  />)
												: (<BlockIcon className={commonClasses.errorColor}/>)
										}</TableCell>
										<TableCell align="center">{
											user.is_active
												? (<CheckCircleOutlineIcon className={commonClasses.successColor}  />)
												: (<BlockIcon className={commonClasses.errorColor}/>)
										}</TableCell>
										<TableCell align="center">
											<IconButton onClick={() => {deleteUser(user.id)}} className={commonClasses.deleteIcon}>
												<DeleteIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
				{DeleteMenu
						? (<Grid
							container
							direction="row"
							justify="space-between"
							alignItems="center"
							className={classes.fab}
						>
							<Fab onClick={hideDeleteMenu}><CancelIcon color="primary"/></Fab>
							<Fab><DeleteOutlineIcon color="primary"/></Fab>
						</Grid>)
						: null
					}
			</Container>
		</>
	)
}
