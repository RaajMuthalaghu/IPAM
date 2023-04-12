import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUser, deleteUser } from "../actions/users";
import UserDataService from "../services/user.service";

class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeusername = this.onChangeusername.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onChangeadmintype = this.onChangeadmintype.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateadmintype = this.updateadmintype.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        username: "",
        password: "",
        admintype: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.username);
  }
  
  onChangeusername(e) {
    const username = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          username: username
        }
      };
    });
  }

  onChangepassword(e) {
    const password = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          password: password
        }
      };
    });
  }

  onChangeadmintype(e) {
    const admintype = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          admintype: admintype
        }
      };
    });
  }

  getUser(username) {
    UserDataService.get(username)
      .then(response => {
        console.log(response.data);
        this.setState({
          currentUser: response.data[0],
        });
      })
      .catch(e => {
        console.log(e);
      });
      
      
  }
  //updatePassword toggleadmintype
  updateadmintype() {
    if (this.state.currentUser.username === "admin"){
      this.setState({ message: "User admin privilege cannot be changed!"});
      return
    }     
    //this.state.currentUser.admintype = !this.state.currentUser.admintype;
    this.setState({admintype: !this.state.currentUser.admintype});
    UserDataService.toggleadmintype(
      this.state.currentUser.username,
      this.state.currentUser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "User Privilege changed!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

//   updatePublished(status) {
//     var data = {
//       id: this.state.currentTutorial.id,
//       title: this.state.currentTutorial.title,
//       description: this.state.currentTutorial.description,
//       published: status
//     };

//     TutorialDataService.update(this.state.currentTutorial.id, data)
//       .then(response => {
//         this.setState(prevState => ({
//           currentTutorial: {
//             ...prevState.currentTutorial,
//             published: status
//           }
//         }));
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

  updateUser() {
    UserDataService.updatePassword(
      this.state.currentUser.username,
      this.state.currentUser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The User password was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {   
    if (this.state.currentUser.username === "admin"){
      this.setState({ message: "User admin cannot be deleted!"});
      return
    } 
    UserDataService.delete(this.state.currentUser.username)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/users')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User Information</h4>
            <form>
              <div className="form-group">
                <label htmlFor="username">UserName</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={currentUser.username}
                  onChange={this.onChangeusername}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={currentUser.password}
//                  onfocus="this.value=''"
                  onChange={this.onChangepassword}
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="admintype">AdminType</label>
                <input
                  type="text"
                  className="form-control"
                  id="admintype"
                  value={currentUser.admintype}
                  onChange={this.onChangeadmintype}
                />
              </div> */}

              <div className="form-group" onChange={this.onChangeadmintype}>
                <label>
                  <strong>Is Admin:</strong>
                </label>
                {currentUser.admintype ? "Yes" : "No"}
              </div>
              
            </form>

            {/* {currentUer.admintype ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )} */}

            {/* <button
              className="badge badge-danger mr-2"
              onClick={this.updateadmintype}
            >
              Toggle AdminType 
            </button> */}

           <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUser}
            >
              Delete User
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUser}
            >
              Change Password
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    );
  }
}
export default connect(null, { updateUser, deleteUser })(User);