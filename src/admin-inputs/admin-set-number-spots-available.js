import React from "react";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  spots: yup.number().required().positive().integer(),
});

function AdminSetNumberSpotsAvailable(props) {
  return (
    <Formik
      //   validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        spots: 0,
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
          <Form.Group controlId="formBasicRangeCustom">
            <Form.Label>{values.spots}</Form.Label>
            <Form.Control
              type="range"
              min={1}
              max={props.maxNumSpots}
              step={1}
              onChange={handleChange}
              custom
              id="spots"
            />
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
}

export default AdminSetNumberSpotsAvailable;
