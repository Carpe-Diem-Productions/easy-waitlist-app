import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import firebase from "../MyFirebase";
import { useAuth } from "../ProvideAuth";

const AdminSearchInWaitlist = () => {
  const [showQueryResult, setShowQueryResult] = useState(false);
  const [showError, setShowError] = useState(false);
  const [functionError, setFunctionError] = useState("");

  const [numWLRecordsFound, setNumWLRecordsFound] = useState(0);

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
        setFunctionError(error.code + error.message + error.details);
        setShowError(true);
        setShowQueryResult(false);
      });
  };

  return (
    <div>
      <Button onClick={startSearch}>Search</Button>
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
    </div>
  );
};

export default AdminSearchInWaitlist;
