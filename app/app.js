import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import '../public/style.scss'


import App from './components/app.js';
import Register from './components/register.js';
import Login from './components/login.js';
import Profile from './components/profile.js'

const routes=(
	<Router history={browserHistory}>  
		<Route path="/" component={App} />
		<Route path="register" component={Register} />
		<Route path="login" component={Login} />
		<Route path="profile" component={Profile} />
	</Router>
)

render(
	routes, document.getElementById("main")
	);