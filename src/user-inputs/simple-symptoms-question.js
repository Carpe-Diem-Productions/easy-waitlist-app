import React, { Component } from "react";
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
  };
  render() {
    return (
      <div className="User-Questions">
        <img
          src={doctor_img}
          className="User-Questions-Graphics"
          alt="An illustration of a doctor"
        />

        <h2>Are you experiencing any symptoms today?</h2>
        <p>
          According to the Center for Disease Control, symptoms for COVID-19
          include:
        </p>
        <ul>
          <li>Coughing</li>
          <li>Fever</li>
          <li>Sneezing / runny nose</li>
        </ul>
        <button
          className="square"
          onClick={() => {
            this.setState({ userResponse: true });
            this.props.yesHandler();
          }}
        >
          {"Yes, I'm feeling unwell today."}
        </button>
        <button
          className="square"
          onClick={() => {
            this.setState({ userResponse: false });
            this.props.noHandler();
          }}
        >
          {"No, I'm not experiencing symptoms."}
        </button>
        <p>
          You have selected:{" "}
          {<HasSymptoms userResponse={this.state.userResponse} />}
        </p>
      </div>
    );
  }
}

export default SimpleSymptomQuestions;
