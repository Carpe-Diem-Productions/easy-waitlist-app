import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Formik } from "formik";

import firebase from "../MyFirebase";
import { useAuth } from "../ProvideAuth";
import { LinkContainer } from "react-router-bootstrap";

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
      <h1>Zip Codes</h1>
      <h2>
        What zip codes do you wish to use to narrow down the user waitlist?
      </h2>
      <h3>
        Step 1: Go to this website:{" "}
        <a href="https://www.freemaptools.com/find-zip-codes-inside-radius.htm">
          https://www.freemaptools.com/find-zip-codes-inside-radius.htm
        </a>
      </h3>
      <b>
        You need to set a home point and a search radius. It will generate a
        list of zip codes, separated by commas.
      </b>
      <h3>
        Step 2: Copy and paste those zip codes separated by commas into the text
        box below.
      </h3>

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

      {!!dbSuccess && (
        <Alert variant="success" className="my-3">
          <Alert.Heading>Zip code range set successfully</Alert.Heading>
          <LinkContainer to="/admin">
            <Button variant="link">
              Click here to return to the main menu
            </Button>
          </LinkContainer>
        </Alert>
      )}
      {!dbSuccess && dbError !== "" && (
        <Alert variant="danger" className="my-3">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{dbError}</p>
        </Alert>
      )}

      <Card className="text-center">
        <Card.Header>Here's what's currently set</Card.Header>
        <Card.Body>
          <Card.Title>Zip Codes</Card.Title>
          <Card.Text>{currentDbRanges}</Card.Text>
        </Card.Body>
        {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
      </Card>
    </div>
  );
};

export default AdminSetZipRange;
