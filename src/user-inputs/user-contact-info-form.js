import React from "react";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";

import { useAuth } from "../ProvideAuth";

const schema = yup.object().shape({
  firstName: yup.string().required().min(2).ensure(),
  lastName: yup.string().required().min(1).ensure(),
  age: yup.number().required().integer().min(18).max(110),
  zip: yup
    .string()
    .required()
    .length(5)
    .matches(/^\d{5}$/),
  phoneNumber: yup
    .string()
    .length(12)
    .matches(/^\+1\d{10}$/, { message: "You should only enter numbers." }),
  terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
});

function UserContactInfoForm(props) {
  const submitHandler = props.handleSubmit;
  let auth = useAuth();
  let loggedInPhoneNumber = auth.user.phoneNumber;

  return (
    <Formik
      validationSchema={schema}
      onSubmit={submitHandler}
      initialValues={{
        firstName: "",
        lastName: "",
        age: "",
        zip: "",
        phoneNumber: loggedInPhoneNumber,
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
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="validationFormik01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                // To display valid type feedback, isValid needs to be defined. Same with invalid type feedback
                isValid={touched.firstName && !errors.firstName}
                isInvalid={touched.firstName && !!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationFormik02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
                isInvalid={touched.lastName && !!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="validationFormikAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                name="age"
                value={values.age}
                onChange={handleChange}
                isInvalid={touched.age && !!errors.age}
              />

              <Form.Control.Feedback type="invalid">
                {errors.age}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationFormik05">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                name="zip"
                value={values.zip}
                onChange={handleChange}
                isInvalid={touched.zip && !!errors.zip}
              />

              <Form.Control.Feedback type="invalid">
                {errors.zip}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="validationFormikPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                defaultValue={loggedInPhoneNumber}
                name="phoneNumber"
                onChange={handleChange}
                isInvalid={!!errors.phoneNumber}
                readOnly
                plaintext
              />

              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber}
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
            <Button type="submit">Next</Button>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
}

export default UserContactInfoForm;
