import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import firebase from "../MyFirebase";

import { useAuth } from "../ProvideAuth";
import WaitlistInfoTable from "../fragments/waitlist-info-table";

const GetWaitlistInfoByPhoneNumber = (props) => {
  var database = firebase.database();
  const [allWaitlistRecords, setAllWaitlistRecords] = useState(null);
  let auth = useAuth();
  let userPhoneNumber = auth.user.phoneNumber;

  useEffect(() => {
    var userInfoRef = database.ref("user/" + userPhoneNumber);
    userInfoRef.on("value", (snapshot) => {
      setAllWaitlistRecords(snapshot.val());
    });
  }, [database, userPhoneNumber]);

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
              <h2>Record {i + 1}</h2>
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

export default GetWaitlistInfoByPhoneNumber;
