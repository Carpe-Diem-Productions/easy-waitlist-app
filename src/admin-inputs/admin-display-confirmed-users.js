import React, { useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { useAuth } from "../ProvideAuth";

import firebase from "../MyFirebase";

import WaitlistInfoTable from "../fragments/waitlist-info-table";

const AdminDisplayConfirmedUsers = () => {
  let auth = useAuth();
  const [confirmedUsers, setConfirmedUsers] = useState(null);
  const [dataGeneratedTime, setDataGeneratedTime] = useState("");
  const [hoursSinceDataGenerated, setHoursSinceDataGenerated] = useState(0);

  useEffect(() => {
    let dbRef = firebase
      .database()
      .ref(
        "/admin/" + auth.user.uid + "/waitlistSearchResult/cachedConfirmedList"
      );

    const unsubscribe = dbRef.on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        let searchResultTime = new Date(snapshot.val().generatedAt);
        let elapsedHours = Math.floor(
          Math.round((Date.now() - snapshot.val().generatedAt) / 1000) / 3600
        );
        setHoursSinceDataGenerated(elapsedHours);

        setDataGeneratedTime(searchResultTime.toString());
        setConfirmedUsers(snapshot.val().cachedConfirmedList);
      }
    });

    return () => {
      dbRef.off("value", unsubscribe);
    };
  });

  return (
    <div>
      {confirmedUsers === null && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {confirmedUsers !== null && hoursSinceDataGenerated < 6 && (
        <Alert variant="success">
          Data generated at {hoursSinceDataGenerated} hours ago.
        </Alert>
      )}
      {confirmedUsers !== null && hoursSinceDataGenerated >= 6 && (
        <Alert variant="danger">
          Data generated at {hoursSinceDataGenerated} hours ago.
        </Alert>
      )}
      {confirmedUsers !== null && dataGeneratedTime !== "" && (
        <Row>
          <p>Data genereated at {dataGeneratedTime}. </p>
        </Row>
      )}
      {confirmedUsers !== null &&
        confirmedUsers.map((singleConfirmedUser, i) => (
          <div key={i}>
            <Row>
              <h2>Record {i + 1}</h2>
            </Row>
            <Row>
              <WaitlistInfoTable form={singleConfirmedUser} />
            </Row>
          </div>
        ))}
    </div>
  );
};

export default AdminDisplayConfirmedUsers;
