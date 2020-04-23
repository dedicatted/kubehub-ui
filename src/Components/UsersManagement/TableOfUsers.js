import React, { useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Container, Button, Checkbox, makeStyles, Fab, Grid } from '@material-ui/core';
import { commonStyles } from '../../styles/style';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import { TopBar } from '../TopBar';
import AddIcon from '@material-ui/icons/Add';
import { Link, useRouteMatch } from 'react-router-dom';
import { serverURL } from '../../serverLink';


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
// Mock users
const users = [
	{
		id: 1,
		name: 'Artem',
		surname: 'Lakhurov',
		email: 'lakhurov@gmail.com'
	},
	{
		id: 2,
		name: 'Konstantin',
		surname: 'Levchenko',
		email: 'kl@gmail.com'
	}
]

export function TableOfUsers() {
	const commonClasses = commonStyles();
	const classes = useStyles();
	const [DeleteMenu, setDeleteMenu] = useState(false);
	const [ArrayOfDeletedUsersId, setArrayOfDeletedUsersID] = useState([]);
	let { url } = useRouteMatch();

	const showDeleteMenu = () => {
		setDeleteMenu(true);
	}
	const hideDeleteMenu = () => {
		setDeleteMenu(false);
		setArrayOfDeletedUsersID([]);
	}
	const deleteUsers = delteUsersArray => {
		fetch(`${serverURL}/`, {
			method: 'POST',
			body: JSON.stringify({
				ArrayOfDeletedUsersId
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
	const onChangeDeleteCheckbox = event => {
		if (event.target.checked) {
			setArrayOfDeletedUsersID(oldArray => [...oldArray, event.target.value])
		} else if(!event.target.checked) {
			setArrayOfDeletedUsersID(oldArray => oldArray.filter(item => item !== event.target.value))
		}
	}


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
								<TableCell>Name</TableCell>
								<TableCell align="center">E-mail</TableCell>
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
										<TableCell component="th" scope="row">{`${user.name} ${user.surname}`}</TableCell>
										<TableCell align="center">{user.email}</TableCell>
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
							<Fab onClick={() => deleteUsers(ArrayOfDeletedUsersId)}><DeleteOutlineIcon color="primary"/></Fab>
						</Grid>)
						: null
					}
			</Container>
		</>
	)
}
