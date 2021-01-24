import React from "react";
import logo_img from "./logo/vector/default-tight.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";

import { useAuth } from "./ProvideAuth";
import { LinkContainer } from "react-router-bootstrap";

const Navigator = () => {
  let auth = useAuth();
  let userPhoneNumber = "";
  if (typeof auth.user !== "undefined") {
    userPhoneNumber = auth.user.phoneNumber;
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
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as:
          <LinkContainer to="/user">
            <a>{userPhoneNumber}</a>
          </LinkContainer>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigator;
