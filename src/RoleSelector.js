import React, { Component } from "react";
import UserMainPage from "./UserMainPage";
import ErrorNotImplemented from "./error-popups/not-implemented";

function DisplayRole(props) {
  const role = props.role;
  if (role === "admin") {
    return <ErrorNotImplemented />; // TODO
  } else if (role === "user") {
    return <UserMainPage />;
  } else {
    return null;
  }
}

class RoleSelector extends Component {
  state = {
    role: null,
    areButtonsHidden: false,
  };
  render() {
    return (
      <div className="App">
        <button
          className="square"
          onClick={() => {
            this.setState({ role: "admin" });
            this.setState({ areButtonsHidden: true });
          }}
          hidden={this.state.areButtonsHidden}
        >
          {"I'm an administrator at a health clinic"}
        </button>
        <button
          className="square"
          onClick={() => {
            this.setState({ role: "user" });
            this.setState({ areButtonsHidden: true });
          }}
          hidden={this.state.areButtonsHidden}
        >
          {"I would like to sign up for the COVID-19 vaccine waitlist"}
        </button>
        <DisplayRole role={this.state.role} />
      </div>
    );
  }
}

export default RoleSelector;
