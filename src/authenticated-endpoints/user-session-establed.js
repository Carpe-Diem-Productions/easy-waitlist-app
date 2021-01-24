import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useAuth } from "../ProvideAuth";

import WhatDoYouWantToDoQuestion from "../user-inputs/what-do-you-want-to-do";

const UserSessionEstablished = () => {
  let auth = useAuth();
  let userPhoneNumber = auth.user.phoneNumber;

  return (
    <Container fluid>
      <Row>
        <WhatDoYouWantToDoQuestion />
      </Row>
    </Container>
  );
};

export default UserSessionEstablished;
