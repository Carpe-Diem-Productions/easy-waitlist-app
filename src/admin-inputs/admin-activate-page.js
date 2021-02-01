import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

import firebase from "../MyFirebase";
import { useAuth } from "../ProvideAuth";
import AdminActivateForm from "./admin-activate-form";

const AdminActivatePage = () => {
  let auth = useAuth();
  const [activateErrorMsg, setActivateErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const submit = (values, actions) => {
    setShowError(false);
    var activateAdminUser = firebase
      .functions()
      .httpsCallable("activateAdminUser");
    activateAdminUser({ suppliedActivationCode: values.activationCode })
      .then((result) => {
        // Read result of the Cloud Function.
        if (!!result.data.activated) {
          console.log("activated admin!!!");
          return auth.refreshIdToken();
        } else {
          throw new firebase.functions.https.HttpsError(
            "unknown",
            "The server didn't return the correct result."
          );
        }
      })
      .then(() => {
        console.log("can go redirect here");
        actions.setSubmitting(false);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        console.log(error.details);
        setActivateErrorMsg(error.message);
        setShowError(true);
        actions.setSubmitting(false);
      });
  };

  return (
    <div>
      <AdminActivateForm handleSubmit={submit} />
      {!!showError ? (
        <Row className="my-3">
          <Alert
            variant="danger"
            onClose={() => setShowError(false)}
            dismissible
          >
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{activateErrorMsg}</p>
          </Alert>
        </Row>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AdminActivatePage;
