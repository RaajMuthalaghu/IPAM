import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginuser } from "../actions/users";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

class LoginUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeusername = this.onChangeusername.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      username: "",
      password: "", 
      admintype: false,

      submitted: false
    };
  }

  onChangeusername(e) {
    this.setState({
        username: e.target.value
    });
  }

  onChangepassword(e) {
    this.setState({
        password: e.target.value
    });
  }


  authenticate() {
    const { username, password } = this.state;
    let status=false;
    toast('Login clicked')
    this.props
    .loginuser(username, password)
    .then((data) => {
        if(data.message === true) status= true; else  status= false;
      this.setState({
        username: data.username,
        password: data.password,

        submitted: status,
      });
      
      
    })
    .catch((e) => {
      console.log(e);
    });
  }

  newUser() {
    this.setState({
        username: "",
        password: "",

        submitted: false
    });
  }

  render() {
    return (

        <div className="submit-form">
          <form>
          {this.state.submitted ? (
            <div>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                    <Link to={"/users"} className="nav-link">
                        Users
                    </Link>
                    </li>
                    {/* <li className="nav-item">
                    <Link to={"/auth/signup"} className="nav-link">
                        Add
                    </Link>
                    </li> */}
                </div>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  required
                  value={this.state.username}
                  onChange={this.onChangeusername}
                  name="username"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                  value={this.state.password}
                  onChange={this.onChangepassword}
                  name="password"
                />
              </div>
  
              <button onClick={this.authenticate} className="btn btn-success">
                Login
              </button>
              <button onClick={this.newUser} className="btn btn-success">
                Clear
              </button>
            </div>
           )} 
          </form>

        </div>
      );
  }
}
export default connect(null, { loginuser })(LoginUser);