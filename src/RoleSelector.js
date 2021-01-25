import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

const RoleSelector = () => {
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col></Col>
        <Col>
          <LinkContainer to="/admin">
            <Button variant="primary" size="lg" block className="my-3">
              {"I'm an administrator at a health clinic"}
            </Button>
          </LinkContainer>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <LinkContainer to="/user">
            <Button variant="primary" size="lg" block className="my-3">
              {"I would like to sign up for the COVID-19 vaccine waitlist"}
            </Button>
          </LinkContainer>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default RoleSelector;
