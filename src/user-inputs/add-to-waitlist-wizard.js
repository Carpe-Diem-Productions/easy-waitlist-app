import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import StepWizard from "react-step-wizard";

import UserContactInfoForm from "./user-contact-info-form";

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

  return <UserContactInfoForm handleSubmit={submit} />;
};

const SecondConfirmDetails = (props) => {
  const nextStep = props.nextStep;
  const prevStep = props.previousStep;
  return (
    <Container fluid>
      <Row>
        <h2>Here's what you have entered. Does it look alright?</h2>
      </Row>
      <Row>
        <Col md={6}>
          <Row>
            <Table responsive borderless hover striped>
              <tbody>
                <tr>
                  <th>First name: </th>
                  <td>{props.form.firstName}</td>
                </tr>
                <tr>
                  <th>Last name: </th>
                  <td>{props.form.lastName}</td>
                </tr>
                <tr>
                  <th>Age: </th>
                  <td>{props.form.age}</td>
                </tr>
                <tr>
                  <th>Zip Code: </th>
                  <td>{props.form.zip}</td>
                </tr>
                <tr>
                  <th>Phone number: </th>
                  <td>{props.form.phone_number}</td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row>
            <Col>
              <Button variant="primary" onClick={nextStep}>
                This is correct.
              </Button>
            </Col>
            <Col>
              <Button variant="secondary" onClick={prevStep}>
                Let me change something.
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const Verify = (props) => {
  return (
    <div>
      <div className={"text-center"}>
        <h3>This is the last step in this example!</h3>
        <hr />
      </div>
    </div>
  );
};

const Last = (props) => {
  return (
    <div>
      <div className={"text-center"}>
        <h3>This is the last step in this example!</h3>
        <hr />
      </div>
    </div>
  );
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
        <StepWizard isHashEnabled>
          <FirstFillInInfo hashKey={"new-signup"} update={this.updateForm} />
          <SecondConfirmDetails hashKey={"review"} form={this.state.form} />
          <Last hashKey={"confirmed"} />
        </StepWizard>
      </Container>
    );
  }
}

export default AddToWaitlistWizard;
