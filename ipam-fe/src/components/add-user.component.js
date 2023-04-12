import React, { Component } from "react";
//import UserDataService from "../services/user.service";
import { connect } from "react-redux";
import { createUser } from "../actions/users";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeusername = this.onChangeusername.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onChangeadmintype = this.onChangeadmintype.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      username: "",
      password: "", 
      admintype: true,

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

  onChangeadmintype(e) {
    this.setState({
        admintype: (e.target.value === "true")
    });
  }

  saveUser() {
    const { username, password, admintype } = this.state;
    this.props
    .createUser(username, password, admintype)
    .then((data) => {
      this.setState({
        username: data.username,
        password: data.password,
        admintype: data.admintype,

        submitted: true,
      });
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });
  }

  newUser() {
    this.setState({
        username: "",
        password: "",
        admintype: true,

        submitted: false
    });
  }

  render() {
    return (

        <div className="submit-form">
          <form>
          {this.state.submitted ? (
            <div>
              <h4>Request submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newUser}>
                Add
              </button>
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
  
              <div className="form-group">
                <label htmlFor="admintype">Is Admin</label>
                  <select id="admintype" name="admintype" onChange={this.onChangeadmintype}>
                    <option value ="true" admintype="true">Yes</option>
                    <option value="false" admintype="false">No</option>
                  </select>                
                {/* <input
                  type="text"
                  list="admintype"
                  className="form-control"
                  id="admintype"
                  required
                  value={this.state.admintype}
                  onChange={this.onChangeadmintype}
                  name="admintype"
                /> */}
              </div>
  
              <button onClick={this.saveUser} className="btn btn-success">
                Submit
              </button>
              <button onClick={(e) => { e.preventDefault(); window.location.href="/users/"; }} className="btn btn-success">
                Cancel
              </button>

            </div>
           )} 
          </form>

        </div>
      );
  }
}
export default connect(null, { createUser })(AddUser);