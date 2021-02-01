import React from "react";
import logo_img from "./logo/vector/default-tight.svg";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";

import { useAuth } from "./ProvideAuth";
import { LinkContainer } from "react-router-bootstrap";

const Navigator = () => {
  let auth = useAuth();
  let userPhoneNumber = "";
  let userDisplayName = "";
  let signedInState = false;

  if (
    typeof auth.user !== "undefined" &&
    auth.user !== null &&
    auth.user !== false
  ) {
    userPhoneNumber = auth.user.phoneNumber;
    userDisplayName = auth.user.displayName;
    signedInState = true;
  } else {
    signedInState = false;
  }

  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand>
        <img
          alt="The logo of Easy Waitlist"
          src={logo_img}
          height="50"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end mr-1">
        <Navbar.Text hidden={!signedInState}>
          Signed in as:
          {userPhoneNumber && (
            <LinkContainer
              to={auth.currentRole === "user" ? "/user" : "/admin"}
            >
              <Button variant="link">{userPhoneNumber}</Button>
            </LinkContainer>
          )}
          {userDisplayName && (
            <LinkContainer
              to={auth.currentRole === "user" ? "/user" : "/admin"}
            >
              <Button variant="link">{userDisplayName}</Button>
            </LinkContainer>
          )}
        </Navbar.Text>

        <LinkContainer to="/">
          <Button
            variant="outline-secondary"
            onClick={() => {
              auth.signout();
            }}
            hidden={!signedInState}
          >
            Log out
          </Button>
        </LinkContainer>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigator;
