import React, { useState, useEffect } from "react";

import firebase from "../MyFirebase";

const AddToWaitlistBackend = (props) => {
  var database = firebase.database();
  const [dbError, setDbError] = useState("");
  const [dbCompleted, setDbCompleted] = useState(false);

  var newWaitlistRecordKey = database.ref().child("waitlist").push().key;

  var waitlistRecord = {
    firstName: props.form.firstName,
    lastName: props.form.lastName,
    age: props.form.age,
    zip: props.form.zip,
    phoneNumber: props.form.phoneNumber,
    waitlistRecordKey: newWaitlistRecordKey,
  };

  var updates = {};
  updates["/waitlist/" + newWaitlistRecordKey] = waitlistRecord;
  updates["/zip/" + props.form.zip + "/age/" + props.form.age] = waitlistRecord;
  updates[
    "/user/" + props.form.phoneNumber + "/" + newWaitlistRecordKey
  ] = waitlistRecord;

  useEffect(() => {
    if (dbCompleted === false) {
      database.ref().update(updates, (error) => {
        if (error) {
          setDbCompleted(false);
          setDbError(error);
        } else {
          setDbCompleted(true);
        }
      });
    }
  });

  if (dbCompleted === true) {
    return (
      <div>
        <h2> Thanks! We have saved your place in the waitlist. </h2>
      </div>
    );
  } else {
    return (
      <div>
        <h1> DB Not completed </h1>
        <p> Reason: {dbError} </p>
      </div>
    );
  }
};

export default AddToWaitlistBackend;