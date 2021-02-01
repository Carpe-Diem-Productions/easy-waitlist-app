import React, { useState, useEffect } from "react";

import Row from "react-bootstrap/Row";

import firebase from "../MyFirebase";
import { useAuth } from "../ProvideAuth";
import WaitlistInfoTable from "../fragments/waitlist-info-table";

const GetWaitlistInfoByUid = (props) => {
  var database = firebase.database();
  const [allWaitlistRecords, setAllWaitlistRecords] = useState(null);
  let auth = useAuth();

  useEffect(() => {
    var userInfoRef = database.ref("/user/" + auth.user.uid + "/waitlist");
    userInfoRef.on("value", (snapshot) => {
      setAllWaitlistRecords(snapshot.val());
    });
  }, [database, auth.user]);

  if (
    allWaitlistRecords === null ||
    Object.keys(allWaitlistRecords).length <= 0
  ) {
    return (
      <div>
        <h1> You haven't signed up yet. </h1>
      </div>
    );
  } else {
    return (
      <div>
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
      </div>
    );
  }
};

export default GetWaitlistInfoByUid;
