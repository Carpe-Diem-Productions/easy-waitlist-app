import React from "react";

import Row from "react-bootstrap/Row";

import WhatDoYouWantToDoQuestion from "../user-inputs/what-do-you-want-to-do";

const UserSessionEstablished = () => {
  return (
    <div>
      <Row>
        <WhatDoYouWantToDoQuestion />
      </Row>
    </div>
  );
};

export default UserSessionEstablished;
