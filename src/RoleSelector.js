import React, { Component } from "react";
import UserMainPage from "./UserMainPage";
import ErrorNotImplemented from "./error-popups/not-implemented";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col></Col>
          <Col>
            <Button
              variant="primary"
              size="lg"
              block
              className="my-3"
              onClick={() => {
                this.setState({ role: "admin" });
                this.setState({ areButtonsHidden: true });
              }}
              hidden={this.state.areButtonsHidden}
            >
              {"I'm an administrator at a health clinic"}
            </Button>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Button
              variant="primary"
              size="lg"
              block
              className="my-3"
              onClick={() => {
                this.setState({ role: "user" });
                this.setState({ areButtonsHidden: true });
              }}
              hidden={this.state.areButtonsHidden}
            >
              {"I would like to sign up for the COVID-19 vaccine waitlist"}
            </Button>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <DisplayRole role={this.state.role} />
        </Row>
      </Container>
    );
  }
}

export default RoleSelector;
