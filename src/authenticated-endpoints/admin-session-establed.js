import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";

import { useAuth } from "../ProvideAuth";

const AdminSessionEstablished = () => {
  let auth = useAuth();
  let userDisplayName = auth.user.displayName;

  return (
    <Container fluid>
      <Jumbotron className="my-3">
        <h1>Welcome, {userDisplayName}!</h1>
        <p>Let us help you find suitable vaccine recipients.</p>
        <p>
          <Button variant="primary" size="lg">
            Start
          </Button>
        </p>
      </Jumbotron>
    </Container>
  );
};

export default AdminSessionEstablished;
