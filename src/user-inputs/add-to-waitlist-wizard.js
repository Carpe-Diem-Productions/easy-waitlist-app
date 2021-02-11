import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import Alert from "react-bootstrap/Alert";

import StepWizard from "react-step-wizard";

import UserContactInfoForm from "./user-contact-info-form";
import WaitlistInfoTable from "../fragments/waitlist-info-table";
import AddToWaitlistBackend from "../backend-ops/add-to-waitlist-backend";
import BackToUserMainMenu from "../widgets/back-to-user-main-menu";

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
    <div>
      <UserContactInfoForm handleSubmit={submit} />
      <BackToUserMainMenu />
    </div>
  );
};

const SecondConfirmDetails = (props) => {
  const nextStep = props.nextStep;
  const prevStep = props.previousStep;
  const form = props.form;
  return (
    <div>
      <h3>Here's what you have entered. Does it look alright?</h3>

      <Alert variant="warning">
        You need to be able to receive phone calls to this number. If you want
        to use a different number, log out and log back in with that number.
      </Alert>
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
      <BackToUserMainMenu />
    </div>
  );
};

const LastConfirmation = (props) => {
  if (props.isActive) {
    return (
      <div>
        <AddToWaitlistBackend form={props.form} />
        <BackToUserMainMenu />
      </div>
    );
  } else {
    return (
      <div>
        <Row>
          <h2>Saving your data...</h2>
        </Row>
      </div>
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
      <div>
        <StepWizard>
          <FirstFillInInfo update={this.updateForm} />
          <SecondConfirmDetails form={this.state.form} />
          <LastConfirmation form={this.state.form} />
        </StepWizard>
      </div>
    );
  }
}

export default AddToWaitlistWizard;
