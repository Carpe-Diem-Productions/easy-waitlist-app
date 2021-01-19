import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import WhatDoYouWantToDoQuestion from "../user-inputs/what-do-you-want-to-do";

import AddToWaitlistWizard from "../user-inputs/add-to-waitlist-wizard";

class UserSessionEstablished extends Component {
  state = {
    userFirstName: "Foo",
    userLastName: "Bar",
    userIntent: null,
    sessionID: null,
  };

  userToAddToWaitlist() {
    this.setState({ userIntent: "add" });
  }

  userToVerifyWaitlist() {
    this.setState({ userIntent: "verify" });
  }

  userToRemoveFromWaitlist() {
    this.setState({ userIntent: "remove" });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <p>
            Welcome, {this.state.userFirstName} {this.state.userLastName}
          </p>
        </Row>
        <Row>
          {this.state.userIntent === null && (
            <WhatDoYouWantToDoQuestion
              addToWaitlistButton={() => this.userToAddToWaitlist()}
              verifyWaitlistButton={() => this.userToVerifyWaitlist()}
              removeFromWaitlistButton={() => this.userToRemoveFromWaitlist()}
            />
          )}
          {this.state.userIntent === "add" && <AddToWaitlistWizard />}
        </Row>
      </Container>
    );
  }
}

export default UserSessionEstablished;
