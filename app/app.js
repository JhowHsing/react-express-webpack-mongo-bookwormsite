import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import '../public/style.scss'

import Register from './components/register.js';
import Login from './components/login.js';
import Profile from './components/profile.js';
// import Edit from './components/edit.js';

const routes=(
	<Router history={browserHistory}>  
		<Route path="/" />
		<Route path="register" component={Register} />
		<Route path="login" component={Login} />
		<Route path="profile" component={Profile} />
		<Route path="edit/:bid" />
	</Router>
)

render(
	routes, document.getElementById("main")
	);