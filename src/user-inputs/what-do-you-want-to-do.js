import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

import PromptGraphicsCol from "../widgets/prompt-graphics";
import doctor_img from "../images/doctor.png";

const WhatDoYouWantToDoQuestion = () => {
  return (
    <div>
      <Row className="justify-content-md-center my-3">
        <PromptGraphicsCol
          img_path={doctor_img}
          alt_text="An illustration of a doctor"
        />
        <Col>
          <h2>What would you like to do today?</h2>

          <Row className="mx-auto my-3">
            <LinkContainer exact to="/user/add">
              <Button variant="primary" size="lg">
                {"Add myself to the COVID-19 vaccine waitlist"}
              </Button>
            </LinkContainer>
          </Row>
          <Row className="mx-auto my-3">
            <LinkContainer exact to="/user/verify">
              <Button variant="primary" size="lg">
                {"Verify my existing waitlist information"}
              </Button>
            </LinkContainer>
          </Row>
          <Row className="mx-auto my-3">
            <LinkContainer exact to="/user/remove">
              <Button variant="primary" size="lg">
                {"Remove my existing waitlist information"}
              </Button>
            </LinkContainer>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default WhatDoYouWantToDoQuestion;
