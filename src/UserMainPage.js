import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import ReadyToStart from "./user-inputs/ready-to-start";
import SimpleSymptomQuestions from "./user-inputs/simple-symptoms-question";

import UserSignIn from "./user-inputs/user-sign-in";

import StayHome from "./static-results/stay-home";

class UserMainPage extends Component {
  state = {
    currState: "0-initial",
    userHasSymptoms: null,
  };

  UserDisplayComponentsByState() {
    const currState = this.state.currState;
    if (currState === "0-initial") {
      return (
        <ReadyToStart
          nextButtonClicked={() => this.UserMainStateTransitions()}
        />
      );
    } else if (currState === "1-simple-symptoms-question") {
      return (
        <SimpleSymptomQuestions
          nextButtonClicked={() => this.UserMainStateTransitions()}
          hasSymptomsHandler={() => this.userHasSymptoms()}
          hasNoSymptomsHandler={() => this.userHasNoSymptoms()}
        />
      );
    } else if (currState === "2-sign-in") {
      return <UserSignIn />;
    } else if (currState === "result-stay-home") {
      return <StayHome />;
    } else {
      return <ReadyToStart />;
    }
  }

  UserMainStateTransitions() {
    const currState = this.state.currState;

    if (currState === "0-initial") {
      this.setState({ currState: "1-simple-symptoms-question" });
    } else if (currState === "1-simple-symptoms-question") {
      if (this.state.userHasSymptoms === true) {
        this.setState({ currState: "result-stay-home" });
      } else if (this.state.userHasSymptoms === false) {
        this.setState({ currState: "2-sign-in" });
      }
    }
    return null;
  }

  userHasSymptoms() {
    this.setState({ userHasSymptoms: true });
  }

  userHasNoSymptoms() {
    this.setState({ userHasSymptoms: false });
  }

  render() {
    return (
      <Container>
        <Row>{this.UserDisplayComponentsByState()}</Row>
        <Row></Row>
      </Container>
    );
  }
}

export default UserMainPage;
