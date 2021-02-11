import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

const BackToUserMainMenu = () => {
  return (
    <Row className="justify-content-center my-3">
      <LinkContainer to="/user">
        <Button variant="secondary">Return to main menu</Button>
      </LinkContainer>
    </Row>
  );
};

export default BackToUserMainMenu;
