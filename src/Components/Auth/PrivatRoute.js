import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivatRoute = ({ component: Component, ...rest}) => (
	<Route
		{...rest}
		render={props =>
			localStorage.getItem('accessToken') ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: 'sign_in',
						state: { from: props.location}
					}}
				/>
			)
		}
	/>
)
