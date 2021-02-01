import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";

import { useAuth } from "../ProvideAuth";
import { LinkContainer } from "react-router-bootstrap";

const AdminSessionEstablished = () => {
  let auth = useAuth();
  let userDisplayName = auth.user.displayName;

  return (
    <Container fluid>
      <Jumbotron className="my-3">
        <h1>Welcome, {userDisplayName}!</h1>
        <p>Let us help you find suitable vaccine recipients.</p>
        <p>
          <LinkContainer to="/admin/activate">
            <Button variant="primary" size="lg">
              Activate
            </Button>
          </LinkContainer>
        </p>
        <p>
          <LinkContainer to="/admin/post-activation">
            <Button variant="primary" size="lg">
              Check Activation Status
            </Button>
          </LinkContainer>
        </p>
      </Jumbotron>
    </Container>
  );
};

export default AdminSessionEstablished;
