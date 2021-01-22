import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useAuth } from "../ProvideAuth";

import WhatDoYouWantToDoQuestion from "../user-inputs/what-do-you-want-to-do";

import AddToWaitlistWizard from "../user-inputs/add-to-waitlist-wizard";

const UserSessionEstablished = () => {
  let auth = useAuth();
  let [userPhoneNumber, setUserPhoneNumber] = useState(auth.user.phoneNumber);
  let [userIntent, setUserIntent] = useState("");

  const userToAddToWaitlist = () => {
    setUserIntent({ userIntent: "add" });
  };

  const userToVerifyWaitlist = () => {
    setUserIntent({ userIntent: "verify" });
  };

  const userToRemoveFromWaitlist = () => {
    setUserIntent({ userIntent: "remove" });
  };

  return (
    <Container fluid>
      <Row>
        <p>Welcome! You are signed in as {userPhoneNumber}</p>
      </Row>
      <Row>
        {userIntent === "" && (
          <WhatDoYouWantToDoQuestion
            addToWaitlistButton={() => userToAddToWaitlist()}
            verifyWaitlistButton={() => userToVerifyWaitlist()}
            removeFromWaitlistButton={() => userToRemoveFromWaitlist()}
          />
        )}
        {userIntent === "add" && <AddToWaitlistWizard />}
      </Row>
    </Container>
  );
};

export default UserSessionEstablished;
