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
        <Col md lg={6}>
          <LinkContainer to="/admin">
            <Button variant="primary" size="lg" className="my-3" block>
              {"I'm an administrator at a health clinic."}
            </Button>
          </LinkContainer>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md lg={6}>
          <LinkContainer to="/user">
            <Button variant="primary" size="lg" className="my-3" block>
              {"I want to sign up for the COVID-19 vaccine waitlist."}
            </Button>
          </LinkContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default RoleSelector;
