import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

import StepWizard from "react-step-wizard";

import PromptGraphics from "../widgets/prompt-graphics";
import hello_img from "../hello.png";
import doctor_img from "../doctor.png";

/** Steps */

const ReadyToStart = (props) => {
  return (
    <div>
      <Row className="justify-content-md-center my-3">
        <PromptGraphics
          img_path={hello_img}
          alt_text="An illustration of a heart waving hello"
        />
        <Col>
          <Row className="my-3">
            <h2>Ready to start?</h2>
          </Row>
          <Row className="my-3">
            <p>
              You can add yourself to the waitlist, or check your existing
              waitlist status.
            </p>
          </Row>
          <Row className="my-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                props.nextStep();
              }}
            >
              Next
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const DoYouHaveSymptoms = (props) => {
  return (
    <div>
      <Row className="justify-content-md-center my-3">
        <PromptGraphics
          img_path={doctor_img}
          alt_text="An illustration of a doctor"
        />
        <Col>
          <Row className="my-3">
            <h2>Are you experiencing any symptoms today?</h2>
          </Row>
          <Row>
            <p>
              According to the Center for Disease Control, symptoms for COVID-19
              include:
            </p>
          </Row>
          <Row>
            <ul>
              <li>Coughing</li>
              <li>Fever</li>
              <li>Sneezing / runny nose</li>
            </ul>
          </Row>
          <Row className="my-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                props.nextStep();
              }}
            >
              {"I'm feeling unwell today."}
            </Button>
          </Row>
          <Row className="my-3">
            <LinkContainer to="/user/login">
              <Button variant="primary" size="lg">
                {"No, I'm not experiencing symptoms."}
              </Button>
            </LinkContainer>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const ResultStayHome = () => {
  return <h1>Please stay home and get tested.</h1>;
};

const SimpleSymptomsQuestion = () => {
  return (
    <div>
      <StepWizard>
        <ReadyToStart />
        <DoYouHaveSymptoms />
        <ResultStayHome />
      </StepWizard>
    </div>
  );
};

const UserLogin = () => {
  return <SimpleSymptomsQuestion />;
};

export default UserLogin;
