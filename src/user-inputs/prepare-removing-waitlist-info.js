import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";

import firebase from "../MyFirebase";

import { useAuth } from "../ProvideAuth";
import WaitlistInfoTable from "../fragments/waitlist-info-table";

const PrepareRemovingWaitlistInfo = (props) => {
  let auth = useAuth();

  var database = firebase.database();
  const [dbError, setDbError] = useState("");
  const [allWaitlistRecords, setAllWaitlistRecords] = useState(null);

  useEffect(() => {
    var userInfoRef = database.ref("/user/" + auth.user.uid + "/waitlistKey");
    userInfoRef.on("value", (snapshot) => {
      setAllWaitlistRecords(snapshot.val());
    });
    return () => {
      userInfoRef.off();
    };
  }, [database, auth.user]);

  const removeRecord = async (recordKey) => {
    const associatedZipCode = allWaitlistRecords[recordKey]["zip"];

    const dbRef = firebase.database().ref();

    var updates = {};

    updates["/user/" + auth.user.uid + "/waitlistKey/" + recordKey] = null;

    updates[
      "/zip/" +
        associatedZipCode +
        "/uid/" +
        auth.user.uid +
        "/waitlistKey/" +
        recordKey
    ] = null;

    updates["/waitlistKey/" + recordKey + "/toUid/" + auth.user.uid] = null;

    try {
      await dbRef.update(updates);
    } catch (error) {
      console.error(error);
      setDbError(error);
    }
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
        {dbError !== "" && (
          <Row>
            <Alert variant="danger" show={dbError !== ""}>
              {dbError}
            </Alert>
          </Row>
        )}
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
                    removeRecord(singleRecordKey);
                  }}
                >
                  {"Remove this record"}
                </Button>
              </Col>
            </Row>
            <Row>
              <WaitlistInfoTable form={allWaitlistRecords[singleRecordKey]} />
            </Row>
          </div>
        ))}
      </Container>
    );
  }
};

export default PrepareRemovingWaitlistInfo;
