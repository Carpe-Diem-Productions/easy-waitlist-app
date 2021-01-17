import React, { Component } from "react";
import logo_img from "./logo/vector/default-tight.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Navigator extends Component {
  state = {};
  render() {
    return (
      <Container className="py-3 header-row">
        <Row className="justify-content-md-center m-0 ">
          <Col></Col>
          <Col md="auto">
            <img
              src={logo_img}
              className="justify-content-md-center"
              alt="The logo of Easy Waitlist"
            />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default Navigator;
