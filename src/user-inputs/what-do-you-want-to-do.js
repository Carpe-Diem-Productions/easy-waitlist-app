import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import doctor_img from "../doctor.png";

class WhatDoYouWantToDoQuestion extends Component {
  state = {};
  render() {
    const addToWaitlistHandler = this.props.addToWaitlistButton;
    const verifyWaitlistButtonHandler = this.props.verifyWaitlistButton;
    const removeFromWaitlistButtonHadler = this.props.removeFromWaitlistButton;
    return (
      <Container fluid className="my-3">
        <Row className="justify-content-md-center my-3">
          <Col md={4} sm={1}>
            <img
              src={doctor_img}
              className="img-fluid"
              alt="An illustration of a doctor"
            />
          </Col>
          <Col>
            <Row className="my-3">
              <h2>What would you like to do today?</h2>
            </Row>
            <Row className="my-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  addToWaitlistHandler();
                }}
              >
                {"Add myself to the COVID-19 vaccine waitlist"}
              </Button>
            </Row>
            <Row className="my-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  verifyWaitlistButtonHandler();
                }}
              >
                {"Verify my existing waitlist information"}
              </Button>
            </Row>
            <Row className="my-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  removeFromWaitlistButtonHadler();
                }}
              >
                {"Edit my existing waitlist information"}
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default WhatDoYouWantToDoQuestion;
