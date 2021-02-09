import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import GetWaitlistInfoByUid from "../backend-ops/get-waitlist-info-by-uid";

import PromptGraphicsCol from "../widgets/prompt-graphics";
import BackToUserMainMenu from "../widgets/back-to-user-main-menu";
import hello_img from "../images/hello.png";

class VerifyExistingWaitlistStatus extends Component {
  state = {};
  render() {
    return (
      <div>
        <Row className="justify-content-md-center my-3">
          <PromptGraphicsCol
            img_path={hello_img}
            alt_text="An illustration of a heart waving hello"
          />
          <Col>
            <GetWaitlistInfoByUid />
          </Col>
        </Row>
        <BackToUserMainMenu />
      </div>
    );
  }
}

export default VerifyExistingWaitlistStatus;
