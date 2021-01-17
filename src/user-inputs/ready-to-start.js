import React, { Component } from "react";
import hello_img from "../hello.png";

class ReadyToStart extends Component {
  state = {};
  render() {
    return (
      <div className="User-Questions">
        <img
          src={hello_img}
          className="User-Questions-Graphics"
          alt="An illustration of a heart waving hello"
        />

        <h2>Ready to start?</h2>

        <p>
          You can add yourself to the waitlist, or check your existing waitlist
          status.
        </p>
      </div>
    );
  }
}

export default ReadyToStart;
