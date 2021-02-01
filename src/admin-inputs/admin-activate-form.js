import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";

import { useAuth } from "../ProvideAuth";
import { LinkContainer } from "react-router-bootstrap";

const schema = yup.object().shape({
  activationCode: yup.string().required().min(11).ensure(),
  terms: yup.bool().required().oneOf([true], "Terms must be accepted."),
});

function AdminActivateForm(props) {
  let auth = useAuth();
  if (auth.currentRole === "verified-admin") {
    return (
      <div>
        <Row>
          <h1>Thank you for activating.</h1>
        </Row>
        <Row>
          <LinkContainer to="/admin">
            <Button variant="primary">Go to main menu</Button>
          </LinkContainer>
        </Row>
      </div>
    );
  } else if (auth.currentRole === "unverified-admin") {
    return (
      <Formik
        validationSchema={schema}
        onSubmit={props.handleSubmit}
        initialValues={{
          activationCode: "",
          terms: false,
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
            <Form.Row>
              <Form.Group as={Col} controlId="validationFormikActivationCode">
                <Form.Label>Activation Code</Form.Label>
                <Form.Control
                  type="text"
                  name="activationCode"
                  value={values.activationCode}
                  onChange={handleChange}
                  isValid={touched.activationCode && !errors.activationCode}
                  isInvalid={touched.activationCode && !!errors.activationCode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.activationCode}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group>
                <Form.Check
                  required
                  name="terms"
                  label="Agree to terms and conditions"
                  onChange={handleChange}
                  isInvalid={!!errors.terms}
                  feedback={errors.terms}
                  id="validationFormik0"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Button type="submit" disabled={isSubmitting}>
                Submit form
              </Button>
            </Form.Row>
          </Form>
        )}
      </Formik>
    );
  } else {
    return <p>Unauthorized. You are not signed in as an admin.</p>;
  }
}

export default AdminActivateForm;
