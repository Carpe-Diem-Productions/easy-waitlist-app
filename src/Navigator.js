import React from "react";
import logo_img from "./logo/vector/default-tight.svg";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";

import { useAuth } from "./ProvideAuth";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import Image from "react-bootstrap/Image";

const Navigator = () => {
  let auth = useAuth();
  let userPhoneNumber = "";
  let userDisplayName = "";
  let signedInState = false;
  let homeLinkHref = "";

  if (auth.currentRole === "visitor") {
    signedInState = false;
    homeLinkHref = "/";
  } else if (auth.currentRole === "user") {
    signedInState = true;
    homeLinkHref = "/user";
    userPhoneNumber = auth.user.phoneNumber;
  } else if (auth.currentRole === "unverified-admin") {
    signedInState = true;
    homeLinkHref = "/admin";
    userDisplayName = auth.user.displayName;
  } else if (auth.currentRole === "verified-admin") {
    signedInState = true;
    homeLinkHref = "/admin";
    userDisplayName = auth.user.displayName;
  }

  return (
    <Navbar collapseOnSelect expand="md" bg="light" variant="light">
      <Navbar.Brand>
        <Image
          fluid
          alt="Easy Waitlist"
          src={logo_img}
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to={homeLinkHref}>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav hidden={!signedInState}>
          {userDisplayName !== "" && (
            <Navbar.Text className="mr-3">
              Signed in as: {userDisplayName}
            </Navbar.Text>
          )}
          {userDisplayName === "" && userPhoneNumber !== "" && (
            <Navbar.Text className="mr-3">
              Signed in as: {userPhoneNumber}
            </Navbar.Text>
          )}
          {/* This button cannot be put inside a LinkContainer, 
          because logging out needs a full browser reload using href*/}
          <Button
            variant="outline-secondary"
            onClick={() => {
              auth.signout();
            }}
            href="/"
          >
            Log Out
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigator;
