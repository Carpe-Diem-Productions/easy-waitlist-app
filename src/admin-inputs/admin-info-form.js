import React from "react";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";

import { useAuth } from "../ProvideAuth";

const schema = yup.object().shape({
  fullName: yup.string().required().min(3).ensure(),
  clinicName: yup.string().required().min(3).ensure(),
  clinicStreet: yup.string().required().min(3).ensure(),
  clinicCity: yup.string().required().min(2).ensure(),
  clinicState: yup.string().required().min(2).ensure(),
  clinicZip: yup
    .string()
    .required()
    .length(5)
    .matches(/^\d{5}$/, { message: "Enter 5-digit ZIP Code." }),
  phoneNumber: yup
    .string()
    .required()
    .length(12)
    .matches(/^\+1\d{10}$/, {
      message: "Enter +1 followed by 9 digits, no space or hyphens.",
    }),
  terms: yup.bool().required().oneOf([true], "Terms must be accepted."),
});

function AdminInfoForm(props) {
  const submitHandler = props.handleSubmit;
  let auth = useAuth();
  let loggedInDisplayName = auth.user.displayName;

  return (
    <Formik
      validationSchema={schema}
      onSubmit={submitHandler}
      initialValues={{
        fullName: loggedInDisplayName,
        clinicName: "",
        clinicStreet: "",
        clinicCity: "",
        clinicState: "",
        clinicZip: "",
        phoneNumber: "",
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
              <Form.Label>Administrator's full name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                // To display valid type feedback, isValid needs to be defined. Same with invalid type feedback
                isValid={touched.fullName && !errors.fullName}
                isInvalid={touched.fullName && !!errors.fullName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="validationFormikClinicName">
              <Form.Label>Clinic name</Form.Label>
              <Form.Control
                type="text"
                name="clinicName"
                value={values.clinicName}
                onChange={handleChange}
                isValid={touched.clinicName && !errors.clinicName}
                isInvalid={touched.clinicName && !!errors.clinicName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.clinicName}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="validationFormikClinicStreet">
              <Form.Label>Clinic Street</Form.Label>
              <Form.Control
                type="text"
                name="clinicStreet"
                value={values.clinicStreet}
                onChange={handleChange}
                isInvalid={touched.clinicStreet && !!errors.clinicStreet}
              />

              <Form.Control.Feedback type="invalid">
                {errors.clinicStreet}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="validationFormikClinicCity">
              <Form.Label>Clinic city</Form.Label>
              <Form.Control
                type="text"
                name="clinicCity"
                value={values.clinicCity}
                onChange={handleChange}
                isInvalid={touched.clinicCity && !!errors.clinicCity}
              />

              <Form.Control.Feedback type="invalid">
                {errors.clinicCity}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationFormikClinicState">
              <Form.Label>Clinic state</Form.Label>
              <Form.Control
                type="text"
                name="clinicState"
                value={values.clinicStreet}
                onChange={handleChange}
                isInvalid={touched.clinicState && !!errors.clinicState}
              />

              <Form.Control.Feedback type="invalid">
                {errors.clinicState}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationFormikClinicZip">
              <Form.Label>Clinic ZIP code</Form.Label>
              <Form.Control
                type="text"
                name="clinicZip"
                value={values.clinicZip}
                onChange={handleChange}
                isInvalid={touched.clinicZip && !!errors.clinicZip}
              />

              <Form.Control.Feedback type="invalid">
                {errors.clinicZip}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="validationFormikPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                onChange={handleChange}
                isInvalid={touched.clinicZip && !!errors.phoneNumber}
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
            <Button type="submit">Submit form</Button>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
}

export default AdminInfoForm;
