import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

import StepWizard from "react-step-wizard";

import GetWaitlistInfoByPhoneNumber from "../backend-ops/get-waitlist-info-by-phone-number";

import PromptGraphics from "../widgets/prompt-graphics";
import BackToUserMainMenu from "../widgets/back-to-user-main-menu";
import hello_img from "../hello.png";

class VerifyExistingWaitlistStatus extends Component {
  state = {};
  render() {
    return (
      <Container fluid className="my-3">
        <Row className="justify-content-md-center my-3">
          <PromptGraphics
            img_path={hello_img}
            alt_text="An illustration of a heart waving hello"
          />
          <Row>
            <GetWaitlistInfoByPhoneNumber />
          </Row>
        </Row>
        <BackToUserMainMenu />
      </Container>
    );
  }
}

export default VerifyExistingWaitlistStatus;
