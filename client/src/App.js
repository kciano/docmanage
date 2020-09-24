import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Signin from './auth/Signin';
import Layout from './core/Layout';
import Signup from './auth/Signup';
import Admin from './core/Admin'
import Private from './core/Private'
import PageNotFound from './core/PageNotFound'
import Appointments from './component/Appointments'
// import AppointmentsPrivate from './component/AppointmentsPrivate'
import PatientsAdmin from './component/Patients'

import AdminRoute from './auth/AdminRoute'
import PrivateRoute from './auth/PrivateRoute'

const App = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Switch>
					<Route path="/" exact component={Signin} />
          			<Route path="/signup" exact component={Signup} />
					<AdminRoute path="/admin" exact component={Admin} />
					<Route path="/appointment" exact component={Appointments}/>
					<Route path="/patients" exact component={PatientsAdmin}/>
					<PrivateRoute path="/private" exact component={Private} />
					<Route path="*" exact component={PageNotFound} />
          
				</Switch>
			</Layout>
		</BrowserRouter>
	);
};

export default App;

