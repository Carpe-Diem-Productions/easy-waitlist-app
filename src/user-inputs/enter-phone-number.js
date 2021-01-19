import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import PromptGraphics from "../widgets/prompt-graphics";
import hello_img from "../hello.png";

class EnterPhoneNumber extends Component {
  state = {};
  render() {
    const anyButtonClicked = this.props.anyButtonClicked;
    return (
      <Container fluid className="my-3">
        <Row className="justify-content-md-center my-3">
          <PromptGraphics
            img_path={hello_img}
            alt_text="An illustration of a heart waving hello"
          />
          <Col>
            <Row className="my-3">
              <h2>Enter your phone number to get started.</h2>
            </Row>
            <Row className="my-3">
              <Form>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Control type="tel" placeholder="Including leading +1" />
                  <Form.Text className="text-muted">
                    We'll never share your phone number with anyone else.
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" size="lg" type="submit">
                  Text me
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    anyButtonClicked();
                  }}
                >
                  Call me
                </Button>
              </Form>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EnterPhoneNumber;
