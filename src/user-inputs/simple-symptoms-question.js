import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import PromptGraphics from "../widgets/prompt-graphics";
import doctor_img from "../doctor.png";

function HasSymptoms(props) {
  if (props.userResponse == null) {
    return null;
  } else if (props.userResponse === true) {
    return <b>Yes, I'm feeling unwell today. </b>;
  } else {
    return <b>No, I'm not experiencing symptoms.</b>;
  }
}

class SimpleSymptomQuestions extends Component {
  state = {
    userResponse: null,
    isNextButtonDisabled: true,
  };

  userClickedYes() {
    this.setState({ userResponse: true });
    this.setState({ isNextButtonDisabled: false });
  }

  userClickedNo() {
    this.setState({ userResponse: false });
    this.setState({ isNextButtonDisabled: false });
  }

  render() {
    const nextButtonClicked = this.props.nextButtonClicked;
    const hasSymptomsHandler = this.props.hasSymptomsHandler;
    const hasNoSymptomsHandler = this.props.hasNoSymptomsHandler;

    return (
      <Container fluid className="my-3">
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
                According to the Center for Disease Control, symptoms for
                COVID-19 include:
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
                  this.userClickedYes();
                  hasSymptomsHandler();
                }}
              >
                {"Yes, I'm feeling unwell today."}
              </Button>
            </Row>
            <Row className="my-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  this.userClickedNo();
                  hasNoSymptomsHandler();
                }}
              >
                {"No, I'm not experiencing symptoms."}
              </Button>
            </Row>
            <Row>
              <p>
                You have selected:{" "}
                {<HasSymptoms userResponse={this.state.userResponse} />}
              </p>
            </Row>
            <Row className="my-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  nextButtonClicked();
                }}
                disabled={this.state.isNextButtonDisabled}
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

export default SimpleSymptomQuestions;
