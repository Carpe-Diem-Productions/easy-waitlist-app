import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import firebase from "../MyFirebase";

import { useAuth } from "../ProvideAuth";
import WaitlistInfoTable from "../fragments/waitlist-info-table";
import RemoveWaitlistInfo from "../backend-ops/remove-waitlist-info";

const PrepareRemovingWaitlistInfo = (props) => {
  let auth = useAuth();
  let userPhoneNumber = auth.user.phoneNumber;

  var database = firebase.database();
  const [allWaitlistRecords, setAllWaitlistRecords] = useState(null);
  const [recordKeyToBeRemoved, setRecordKeyToBeRemoved] = useState("invalid");

  useEffect(() => {
    var userInfoRef = database.ref("user/" + userPhoneNumber);
    userInfoRef.on("value", (snapshot) => {
      setAllWaitlistRecords(snapshot.val());
    });
  }, [database, userPhoneNumber]);

  const doneRemoval = () => {
    setRecordKeyToBeRemoved("invalid");
  };

  if (
    allWaitlistRecords === null ||
    Object.keys(allWaitlistRecords).length <= 0
  ) {
    return (
      <div>
        <h2> You haven't signed up yet. </h2>
      </div>
    );
  } else {
    return (
      <Container>
        <Row>
          <h1> Here's what you have registered: </h1>
        </Row>
        {Object.keys(allWaitlistRecords).map((singleRecordKey, i) => (
          <div key={i}>
            <Row>
              <Col>
                <h2>Record {i + 1}</h2>
              </Col>
              <Col>
                <Button
                  variant="danger"
                  onClick={() => {
                    setRecordKeyToBeRemoved(singleRecordKey);
                  }}
                >
                  {"Remove this record"}
                </Button>
              </Col>
            </Row>
            <Row>
              <WaitlistInfoTable form={allWaitlistRecords[singleRecordKey]} />
            </Row>
            {recordKeyToBeRemoved !== "invalid" && (
              <RemoveWaitlistInfo
                waitlistRecordKey={recordKeyToBeRemoved}
                finishedCb={doneRemoval}
              />
            )}
          </div>
        ))}
      </Container>
    );
  }
};

export default PrepareRemovingWaitlistInfo;
