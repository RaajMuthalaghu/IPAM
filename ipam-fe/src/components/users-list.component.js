import React, { Component } from "react";
// import UserDataService from "../services/user.service";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { retrieveUsers, findByUserName } from "../actions/users";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchusername = this.onChangeSearchusername.bind(this);
//    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.searchusername = this.searchusername.bind(this);

    this.state = {
//      users: [],
      currentUser: null,
      currentIndex: -1,
      searchUser: ""
    };
  }

  componentDidMount() {
    this.props.retrieveUsers();
  }

  onChangeSearchusername(e) {
    const searchusername = e.target.value;

    this.setState({
        searchusername: searchusername
    });
    this.props.findByUserName(this.state.searchusername);
  }

  // retrieveUsers() {
  //   UserDataService.getAll()
  //     .then(response => {
  //       this.setState({
  //         users: response.data
  //       });
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  refreshList() {
//    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

  searchusername() {
    this.refreshList();
    this.props.findByUserName(this.state.searchusername);
      // .then(response => {
      //   this.setState({
      //     users: response.data
      //   });
      //   console.log(response.data);
      // })
      // .catch(e => {
      //   console.log(e);
      // });
  }

  render() {
    const { searchusername, currentUser, currentIndex } = this.state;
    const { users } = this.props;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by UserName"
              value={searchusername}
              onChange={this.onChangeSearchusername}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchusername}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Users List</h4>

          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                  key={index}
                >
                  {user.username}
                </li>
              ))}
          </ul>

          {/* <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Remove All
          </button> */}
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <h4>User Details</h4>
              <div>
                <label>
                  <strong>UserName:</strong>
                </label>{" "}
                {currentUser.username}
              </div>
              <div>
                <label>
                  <strong>Password:</strong>
                </label>{" "}
                {/* {currentUser.password} */}
                {"******"}
              </div>
              <div>
                <label>
                  <strong>AdminType:</strong>
                </label>{" "}
                {currentUser.admintype ? "Yes" : "No"}
              </div>

              <Link
                to={"/users/" + currentUser.username}
                className="Nav_link"
              >
                Edit User
              </Link>
              <Link
                to={"/auth/signup"}
                className="Nav_link"
              >
                Add User
              </Link>
            </div>
          ) : (
            <div>
              <Link
                to={"/auth/signup"}
                className="Nav_link"
              >
                Add User
              </Link>
              <br />
              <p>Please click on a User for Edit...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps, { retrieveUsers, findByUserName })(UsersList);