import React, { useState } from "react";

import { Redirect, useHistory, useLocation } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import firebase from "../MyFirebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { useAuth } from "../ProvideAuth";

import PromptGraphics from "../widgets/prompt-graphics";
import hello_img from "../hello.png";

const AdminSignIn = (props) => {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  const [role, setRole] = useState("unknown");
  const [signinSuccess, setSigninSuccess] = useState(false);
  const [dbError, setDbError] = useState("");
  const [dbCompleted, setDbCompleted] = useState(false);

  let { from } = location.state || { from: { pathname: "/" } };

  const storeAdminInfo = (authResult) => {
    var database = firebase.database();
    var adminInfo = null;
    console.log(authResult);
    if (authResult.user.email !== null) {
      adminInfo = {
        displayName: authResult.user.phoneNumber,
        uid: authResult.user.uid,
        email: authResult.user.email,
        emailVerified: authResult.user.emailVerified,
      };
    } else if (authResult.user.phoneNumber !== null) {
      adminInfo = {
        uid: authResult.user.uid,
        phoneNumber: authResult.user.phoneNumber,
      };
    } else {
      console.log("No valid phoneNumber or email???");
      return;
    }

    database.ref("/admin/" + authResult.user.uid).set(adminInfo, (error) => {
      if (error) {
        setDbCompleted(false);
        setDbError(error);
        console.log(error);
      } else {
        setDbCompleted(true);
      }
    });
  };

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",

    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],

    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        setSigninSuccess(true);
        storeAdminInfo(authResult);
        auth.signInSuccessWithAuthResultCB(authResult, redirectUrl);
        return false;
      },
      signInFailure: (result) => {
        setSigninSuccess(false);
        auth.signInFailureCB(result);
      },
    },
  };

  if (auth.user.uid != null || (signinSuccess && dbCompleted)) {
    return (
      <Redirect
        to={{
          pathname: "/admin",
          state: { from: location },
        }}
      />
    );
  } else {
    return (
      <Container fluid className="my-3">
        <Row className="justify-content-md-center my-3">
          <PromptGraphics
            img_path={hello_img}
            alt_text="An illustration of a heart waving hello"
          />
          <Col>
            <Row className="my-3">
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default AdminSignIn;
