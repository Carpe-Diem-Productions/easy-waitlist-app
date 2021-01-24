import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

import doctor_img from "../doctor.png";

const WhatDoYouWantToDoQuestion = () => {
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
            <LinkContainer exact to="/user/add">
              <Button variant="primary" size="lg">
                {"Add myself to the COVID-19 vaccine waitlist"}
              </Button>
            </LinkContainer>
          </Row>
          <Row className="my-3">
            <LinkContainer exact to="/user/verify">
              <Button variant="primary" size="lg">
                {"Verify my existing waitlist information"}
              </Button>
            </LinkContainer>
          </Row>
          <Row className="my-3">
            <LinkContainer exact to="/user/remove">
              <Button variant="primary" size="lg">
                {"Remove my existing waitlist information"}
              </Button>
            </LinkContainer>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default WhatDoYouWantToDoQuestion;
