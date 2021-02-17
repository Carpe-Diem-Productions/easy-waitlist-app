import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import firebase from "../MyFirebase";

import AdminDisplayConfirmedUsers from "./admin-display-confirmed-users";
import AdminSetNumberSpotsAvailable from "./admin-set-number-spots-available";

const AdminSearchInWaitlist = () => {
  const [showQueryResult, setShowQueryResult] = useState(false);
  const [showError, setShowError] = useState(false);
  const [functionError, setFunctionError] = useState("");

  const [numWLRecordsFound, setNumWLRecordsFound] = useState(0);
  const [searchButtonDisabled, setSearachButtonDisabled] = useState(false);
  const [callButtonDisabled, setCallButtonDisabled] = useState(false);
  const [confirmedUsers, setConfirmedUsers] = useState(null);

  const startSearch = (values, actions) => {
    setShowError(false);
    setSearachButtonDisabled(true);
    var getWaitlistedContacts = firebase
      .functions()
      .httpsCallable("getWaitlistedContacts");
    getWaitlistedContacts()
      .then((result) => {
        // Read result of the Cloud Function.
        console.log(result.data);
        setNumWLRecordsFound(result.data.numWaitlistRecordsFound);
        setShowQueryResult(true);
        setSearachButtonDisabled(false);
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
        setSearachButtonDisabled(false);
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
      {!!showError && (
        <Alert
          variant="danger"
          onClose={() => setShowError(false)}
          dismissible
          className="my-3"
        >
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{functionError}</p>
        </Alert>
      )}
      <Card className="text-center my-2">
        <Card.Header>Step 1</Card.Header>
        <Card.Body>
          <Card.Title>Start search based on selected zip codes</Card.Title>
          <Card.Text>
            <Button onClick={startSearch} disabled={searchButtonDisabled}>
              Search
            </Button>
          </Card.Text>
          <Card.Text>
            {!!showQueryResult && (
              <b>Found {numWLRecordsFound} records on the waitlist!</b>
            )}
          </Card.Text>
        </Card.Body>
        {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
      </Card>

      <Card className="text-center my-2">
        <Card.Header>Step 2</Card.Header>
        <Card.Body>
          <Card.Title>Set how many waitlist spots you can fulfill</Card.Title>
          <Card.Text>
            <AdminSetNumberSpotsAvailable maxNumSpots={numWLRecordsFound} />
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="text-center my-2">
        <Card.Header>Step 3</Card.Header>
        <Card.Body>
          <Card.Title>Start calling users</Card.Title>
          <Card.Text>
            <Button onClick={callUsers} disabled={callButtonDisabled}>
              Call Users
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="text-center my-2">
        <Card.Header>Result</Card.Header>
        <Card.Body>
          <Card.Title>Here's a list of confirmed users</Card.Title>
          <Card.Text>
            <AdminDisplayConfirmedUsers />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminSearchInWaitlist;
