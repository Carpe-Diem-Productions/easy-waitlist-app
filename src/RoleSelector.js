import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

const RoleSelector = () => {
  return (
    <div>
      <Row className="d-flex justify-content-center">
        <Col md={8} lg={6}>
          <LinkContainer to="/admin">
            <Button variant="primary" size="lg" className="my-3" block>
              {"I'm an administrator at a health clinic."}
            </Button>
          </LinkContainer>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center">
        <Col md={8} lg={6}>
          <LinkContainer to="/user">
            <Button variant="success" size="lg" className="my-3" block>
              {"I want to join the COVID-19 vaccine waitlist."}
            </Button>
          </LinkContainer>
        </Col>
      </Row>
    </div>
  );
};

export default RoleSelector;
