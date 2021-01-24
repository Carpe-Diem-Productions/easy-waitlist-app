import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useAuth } from "../ProvideAuth";

import WhatDoYouWantToDoQuestion from "../user-inputs/what-do-you-want-to-do";

import AddToWaitlistWizard from "../user-inputs/add-to-waitlist-wizard";
import VerifyExistingWaitlistStatus from "../user-inputs/verify-existing-waitlist-status";
import RemoveExistingWaitlist from "../user-inputs/remove-existing-waitlist";

const UserSessionEstablished = () => {
  let auth = useAuth();
  let userPhoneNumber = auth.user.phoneNumber;
  let [userIntent, setUserIntent] = useState("");

  const userToAddToWaitlist = () => {
    setUserIntent("add");
  };

  const userToVerifyWaitlist = () => {
    setUserIntent("verify");
  };

  const userToRemoveFromWaitlist = () => {
    setUserIntent("remove");
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
        {userIntent === "verify" && <VerifyExistingWaitlistStatus />}
        {userIntent === "remove" && <RemoveExistingWaitlist />}
      </Row>
    </Container>
  );
};

export default UserSessionEstablished;
