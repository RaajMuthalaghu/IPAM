import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import { withStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./components/Header";
import PageHeader from './components/PageHeader';

import Login from "./ipamuserComponents/login"
import UsersList from "./ipamuserComponents/users-list.component";


import NetworksList from "./ipamnetworkComponents/networks-list.component";
import IPList from "./ipamipComponents/ips-list.component";

const theme = createTheme({
  spacing: 1,
  palette: {
    primary: { main: "#333996", light: '#3c44b126' },
    secondary: { main: "#f83245", light: '#f8324526' },
    background: { default: "#f4f5fd" },
  },
  overrides:{ MuiAppBar:{ root:{ transform:'translateZ(0)' }}},
  props:{ MuiIconButton:{ disableRipple:true } }
})


const styles = theme =>({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  },
  pageContent: {
    padding: theme.spacing(13),
    margin: theme.spacing(5)
}

})


class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Router>
       <ThemeProvider theme={theme}>
        <nav className={classes.appMain}>
          {/* <div className={classes.appMain}>
            CitiusCloud IPAM
          </div> */}
          <Header />

          {/* <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/auth/signup"} className="nav-link">
                Add
              </Link>
            </li>
          </div> */}
        </nav>

        <div className={classes.pageContent}>
          <Switch>
            <Route exact path={["/","/auth/signin"]} component={Login} />
            <Route exact path="/users" component={UsersList} />
            <Route exact path="/networks" component={NetworksList} />
            <Route path="/ips/:network" component={IPList} />
          </Switch>
        </div>
        <CssBaseline />
    </ThemeProvider>
    </Router>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);