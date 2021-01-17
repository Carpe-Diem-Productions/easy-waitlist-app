import React, { Component } from "react";
import doctor_img from "../doctor.png";

class WhatDoYouWantToDoQuestion extends Component {
  state = {
    userResponse: null,
  };
  render() {
    return (
      <div className="User-Questions">
        <img
          src={doctor_img}
          className="User-Questions-Graphics"
          alt="An illustration of a doctor"
        />

        <h2>What would you like to do today?</h2>

        <button
          className="square"
          onClick={() => {
            this.setState({ userResponse: true });
            // this.props.yesHandler();
          }}
        >
          {"Add myself to the COVID-19 vaccine waitlist"}
        </button>
        <button
          className="square"
          onClick={() => {
            this.setState({ userResponse: false });
            // this.props.noHandler();
          }}
        >
          {"Verify my existing waitlist information"}
        </button>
        <button
          className="square"
          onClick={() => {
            this.setState({ userResponse: false });
            // this.props.noHandler();
          }}
        >
          {"Edit my existing waitlist information"}
        </button>
      </div>
    );
  }
}

export default WhatDoYouWantToDoQuestion;
