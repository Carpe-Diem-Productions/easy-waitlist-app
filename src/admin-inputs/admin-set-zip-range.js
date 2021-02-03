import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";

import firebase from "../MyFirebase";
import { useAuth } from "../ProvideAuth";

const AdminSetZipRange = () => {
  let auth = useAuth();
  const [dbError, setDbError] = useState("");
  const [dbSuccess, setDbSuccess] = useState(false);
  const [currentDbRanges, setCurrnetDbRanges] = useState("");

  useEffect(() => {
    const dbRef = firebase
      .database()
      .ref("/admin/" + auth.user.uid + "/zipSearchRange");
    dbRef.on("value", (dataSnapshot) => {
      setCurrnetDbRanges(dataSnapshot.val());
    });

    return () => {
      dbRef.off();
    };
  });

  const submit = async (values, actions) => {
    const dbRef = firebase
      .database()
      .ref("/admin/" + auth.user.uid + "/zipSearchRange");
    await dbRef
      .set(values.zipCodeRange)
      .then(() => {
        console.log("Zip range stored");
        actions.setSubmitting(false);
        setDbSuccess(true);
      })
      .catch((error) => {
        console.error(error);
        setDbError(error);
        setDbSuccess(false);
        actions.setSubmitting(false);
      });
  };

  return (
    <div>
      <Row>
        <h1>Enter a list of zip codes that you wish to search from</h1>
        <p>
          {" "}
          Go to this website:{" "}
          <a href="https://www.freemaptools.com/find-zip-codes-inside-radius.htm">
            https://www.freemaptools.com/find-zip-codes-inside-radius.htm
          </a>
        </p>
      </Row>
      <Row>
        <Col>
          <h2>Here's what's currently set</h2>
        </Col>
        <Col>
          <p>{currentDbRanges}</p>
        </Col>
      </Row>
      <Row>
        <Formik
          onSubmit={submit}
          initialValues={{
            zipCodeRange: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            isSubmitting,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="admin.SetZipRange">
                <Form.Label>Paste in the zip codes list here</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="zipCodeRange"
                  value={values.zipCodeRange}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Row>
                <Button type="submit" disabled={isSubmitting}>
                  Submit form
                </Button>
              </Form.Row>
            </Form>
          )}
        </Formik>
      </Row>
      {!!dbSuccess && (
        <Row>
          <Alert variant="success">
            <Alert.Heading>Zip code range set successfully</Alert.Heading>
            <p>Return to main menu now</p>
          </Alert>
        </Row>
      )}
      {!dbSuccess && dbError !== "" && (
        <Row>
          <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{dbError}</p>
          </Alert>
        </Row>
      )}
    </div>
  );
};

export default AdminSetZipRange;
