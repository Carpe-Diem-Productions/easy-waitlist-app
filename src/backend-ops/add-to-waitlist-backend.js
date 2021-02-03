import React, { useState, useEffect } from "react";

import firebase from "../MyFirebase";
import { useAuth } from "../ProvideAuth";

const AddToWaitlistBackend = (props) => {
  const database = firebase.database();
  let auth = useAuth();
  const [dbError, setDbError] = useState("");
  const [dbCompleted, setDbCompleted] = useState(false);

  var newWaitlistRecordKey = database
    .ref("/user/" + auth.user.uid + "/waitlistKey/")
    .push().key;

  var waitlistRecord = {
    firstName: props.form.firstName,
    lastName: props.form.lastName,
    age: props.form.age,
    zip: props.form.zip,
    phoneNumber: props.form.phoneNumber,
    waitlistRecordKey: newWaitlistRecordKey,
  };

  var updates = {};

  updates[
    "/user/" + auth.user.uid + "/waitlistKey/" + newWaitlistRecordKey
  ] = waitlistRecord;

  updates[
    "/zip/" +
      waitlistRecord.zip +
      "/uid/" +
      auth.user.uid +
      "/waitlistKey/" +
      newWaitlistRecordKey
  ] = waitlistRecord;

  updates[
    "/waitlistKey/" + newWaitlistRecordKey + "/toUid/" + auth.user.uid
  ] = true;

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
