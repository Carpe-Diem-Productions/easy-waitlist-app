import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import firebase from "../MyFirebase";

import { useAuth } from "../ProvideAuth";

const RemoveWaitlistInfo = (props) => {
  const auth = useAuth();
  let userPhoneNumber = auth.user.phoneNumber;
  const [finishedRemoval, setFinishedRemoval] = useState(false);
  const doneCb = props.finishedCb;

  useEffect(() => {
    console.log("Trying to remove");
    if (finishedRemoval === false) {
      firebase
        .database()
        .ref("/user/" + userPhoneNumber + "/" + props.waitlistRecordKey)
        .remove((error) => {
          if (error) {
            console.log(error);
            setFinishedRemoval(false);
          } else {
            setFinishedRemoval(true);
            doneCb();
          }
        });
    }
  });

  if (finishedRemoval === true) {
    return (
      <div>
        <p>Success</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Failure</p>
      </div>
    );
  }
};

export default RemoveWaitlistInfo;
