import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import firebase from "../MyFirebase";
// import { useAuth } from "../ProvideAuth";

import WaitlistInfoTable from "../fragments/waitlist-info-table";

const AdminSearchInWaitlist = () => {
  const [showQueryResult, setShowQueryResult] = useState(false);
  const [showError, setShowError] = useState(false);
  const [functionError, setFunctionError] = useState("");

  const [numWLRecordsFound, setNumWLRecordsFound] = useState(0);

  const [callButtonDisabled, setCallButtonDisabled] = useState(false);
  const [confirmedUsers, setConfirmedUsers] = useState(null);

  // let auth = useAuth();
  // useEffect(() => {
  //   let dbRef = firebase
  //     .database()
  //     .ref(
  //       "/admin/" + auth.user.uid + "/waitlistSearchResult/cachedConfirmedList"
  //     );
  //   dbRef.once("value", (snapshot) => {
  //     if (snapshot.val() !== null) {
  //       setConfirmedUsers(snapshot.val().cachedConfirmedList);
  //     }
  //   });
  // });

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
      <Row className="my-3">
        <Button onClick={callUsers} disabled={callButtonDisabled}>
          Call Users
        </Button>
      </Row>

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

export default AdminSearchInWaitlist;
