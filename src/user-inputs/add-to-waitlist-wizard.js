import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

import StepWizard from "react-step-wizard";

import UserContactInfoForm from "./user-contact-info-form";
import WaitlistInfoTable from "../fragments/waitlist-info-table";
import AddToWaitlistBackend from "../backend-ops/add-to-waitlist-backend";

/** Steps */
const FirstFillInInfo = (props) => {
  const updateForm = props.update;
  const nextStep = props.nextStep;

  const submit = (values, formikBag) => {
    for (const key in values) {
      updateForm(key, values[key]);
    }

    nextStep();
  };

  return (
    <Container fluid>
      <UserContactInfoForm handleSubmit={submit} />

      <LinkContainer to="/user">
        <Button variant="secondary">Go back to main page.</Button>
      </LinkContainer>
    </Container>
  );
};

const SecondConfirmDetails = (props) => {
  const nextStep = props.nextStep;
  const prevStep = props.previousStep;
  const form = props.form;
  return (
    <Container fluid>
      <Row>
        <h2>Here's what you have entered. Does it look alright?</h2>
      </Row>
      <Row>
        <h2>
          You need to be able to receive phone calls at this phone number.
        </h2>
      </Row>
      <Row>
        <Col md={6}>
          <Row>
            <WaitlistInfoTable form={form} />
          </Row>
          <Row>
            <Col>
              <Button variant="secondary" onClick={prevStep}>
                Let me change something.
              </Button>
            </Col>
            <Col>
              <Button variant="primary" onClick={nextStep}>
                This is correct.
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const LastConfirmation = (props) => {
  if (props.isActive) {
    return (
      <Container fluid>
        <Row>
          <AddToWaitlistBackend form={props.form} />
        </Row>
      </Container>
    );
  } else {
    return (
      <Container fluid>
        <Row>
          <h2>Saving your data...</h2>
        </Row>
      </Container>
    );
  }
};

class AddToWaitlistWizard extends Component {
  state = {
    form: {},
  };
  updateForm = (key, value) => {
    var modified_form = this.state.form;
    modified_form[key] = value;
    this.setState({ form: modified_form });
  };

  render() {
    return (
      <Container fluid>
        <StepWizard>
          <FirstFillInInfo update={this.updateForm} />
          <SecondConfirmDetails form={this.state.form} />
          <LastConfirmation form={this.state.form} />
        </StepWizard>
      </Container>
    );
  }
}

export default AddToWaitlistWizard;
