import React from "react";

import Row from "react-bootstrap/Row";

import PrepareRemovingWaitlistInfo from "./prepare-removing-waitlist-info";

import PromptGraphicsCol from "../widgets/prompt-graphics";
import BackToUserMainMenu from "../widgets/back-to-user-main-menu";
import hello_img from "../images/hello.png";

const RemoveExistingWaitlist = () => {
  return (
    <div>
      <Row className="justify-content-md-center my-3">
        <PromptGraphicsCol
          img_path={hello_img}
          alt_text="An illustration of a heart waving hello"
        />
        <Row>
          <PrepareRemovingWaitlistInfo />
        </Row>
      </Row>
      <BackToUserMainMenu />
    </div>
  );
};

export default RemoveExistingWaitlist;
