import React, { Component } from "react";
import ReadyToStart from "./user-inputs/ready-to-start";
import SimpleSymptomQuestions from "./user-inputs/simple-symptoms-question";
import WhatDoYouWantToDoQuestion from "./user-inputs/what-do-you-want-to-do";
import StayHome from "./static-results/stay-home";

class UserMainPage extends Component {
  state = {
    currState: "0-initial",
    userInput: null,
    isNextButtonDisabled: false,
    isNextButtonHidden: false,
  };

  UserDisplayComponentsByState() {
    const currState = this.state.currState;
    if (currState === "0-initial") {
      return <ReadyToStart />;
    } else if (currState === "1-simple-symptoms-question") {
      return (
        <SimpleSymptomQuestions
          yesHandler={() => this.userClickedYes()}
          noHandler={() => this.userClickedNo()}
        />
      );
    } else if (currState === "2-what-do-you-want-to-do") {
      return <WhatDoYouWantToDoQuestion />;
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
      if (this.state.userInput === true) {
        this.setState({ currState: "result-stay-home" });
      } else if (this.state.userInput === false) {
        this.setState({ currState: "2-what-do-you-want-to-do" });
        this.setState({ isNextButtonHidden: true });
      }
    }
    return null;
  }

  userClickedYes() {
    this.setState({ userInput: true });
  }

  userClickedNo() {
    this.setState({ userInput: false });
  }

  render() {
    return (
      <div>
        {this.UserDisplayComponentsByState()}
        <button
          className="square"
          onClick={() => this.UserMainStateTransitions()}
          disabled={this.state.isNextButtonDisabled}
          hidden={this.state.isNextButtonHidden}
        >
          Next
        </button>
      </div>
    );
  }
}

export default UserMainPage;
