import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import firebase from "../MyFirebase";

import AdminDisplayConfirmedUsers from "./admin-display-confirmed-users";

const AdminSearchInWaitlist = () => {
  const [showQueryResult, setShowQueryResult] = useState(false);
  const [showError, setShowError] = useState(false);
  const [functionError, setFunctionError] = useState("");

  const [numWLRecordsFound, setNumWLRecordsFound] = useState(0);

  const [callButtonDisabled, setCallButtonDisabled] = useState(false);
  const [confirmedUsers, setConfirmedUsers] = useState(null);

  const startSearch = (values, actions) => {
    setShowError(false);
    var getWaitlistedContacts = firebase
      .functions()
      .httpsCallable("getWaitlistedContacts");
    getWaitlistedContacts()
      .then((result) => {
        // Read result of the Cloud Function.
        console.log(result.data);
        setNumWLRecordsFound(result.data.numWaitlistRecordsFound);
        setShowQueryResult(true);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        console.log(error.details);
        setFunctionError(
          "Error code: " + error.code + " Error message: " + error.message
        );
        setShowError(true);
        setShowQueryResult(false);
      });
  };

  const callUsers = () => {
    setCallButtonDisabled(true);
    var callUsersFunc = firebase.functions().httpsCallable("startCallingUsers");

    callUsersFunc({ numSpotsToFill: numWLRecordsFound })
      .then((result) => {
        // Read result of the Cloud Function.
        console.log(result.data);
        setConfirmedUsers(result.data.confirmedList);
        setCallButtonDisabled(false);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        console.log(error.details);
        setFunctionError(
          "Error code: " + error.code + " Error message: " + error.message
        );
        setShowError(true);
        setCallButtonDisabled(false);
      });
  };

  // TODO: Use modals: https://react-bootstrap.github.io/components/modal/
  return (
    <div>
      <Row className="my-3">
        <Button onClick={startSearch}>Search</Button>
      </Row>
      {!!showQueryResult && (
        <Row className="my-3">
          <h1>Found {numWLRecordsFound} records on the waitlist!</h1>
        </Row>
      )}
      {!!showError && (
        <Row className="my-3">
          <Alert
            variant="danger"
            onClose={() => setShowError(false)}
            dismissible
          >
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{functionError}</p>
          </Alert>
        </Row>
      )}
      <Form>
        <Form.Group controlId="formBasicRangeCustom">
          <Form.Label>Range</Form.Label>
          <Form.Control type="range" custom />
        </Form.Group>
      </Form>
      <Row className="my-3">
        <Button onClick={callUsers} disabled={callButtonDisabled}>
          Call Users
        </Button>
      </Row>
      <AdminDisplayConfirmedUsers />
    </div>
  );
};

export default AdminSearchInWaitlist;
