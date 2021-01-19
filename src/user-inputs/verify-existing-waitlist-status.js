import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

import StepWizard from "react-step-wizard";

import PromptGraphics from "../widgets/prompt-graphics";
import hello_img from "../hello.png";

class VerifyExistingWaitlistStatus extends Component {
  state = {};
  render() {
    const nextButtonClicked = this.props.nextButtonClicked;
    return (
      <Container fluid className="my-3">
        <Row className="justify-content-md-center my-3">
          <PromptGraphics
            img_path={hello_img}
            alt_text="An illustration of a heart waving hello"
          />
          <Col>
            <Row className="my-3">
              <h2>Enter the phone number that you used when you signed up</h2>
            </Row>
            <Row className="my-3">
              <InputGroup className="mb-3">
                <DropdownButton
                  as={InputGroup.Prepend}
                  variant="outline-secondary"
                  title="Dropdown"
                  id="input-group-dropdown-1"
                >
                  <Dropdown.Item href="#">Mobile</Dropdown.Item>
                  <Dropdown.Item href="#">Landline</Dropdown.Item>
                </DropdownButton>
                <FormControl aria-describedby="basic-addon1" />
              </InputGroup>
            </Row>
            <Row className="my-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  nextButtonClicked();
                }}
              >
                Next
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default VerifyExistingWaitlistStatus;
