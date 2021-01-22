import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import PromptGraphics from "../widgets/prompt-graphics";
import hello_img from "../hello.png";

class ReadyToStart extends Component {
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

export default ReadyToStart;