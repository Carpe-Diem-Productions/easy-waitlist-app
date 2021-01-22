import React from "react";

import { useHistory, useLocation } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import firebase from "../MyFirebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { useAuth } from "../ProvideAuth";

import PromptGraphics from "../widgets/prompt-graphics";
import hello_img from "../hello.png";

const UserSignIn = () => {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/user",

    signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],

    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        auth.signInSuccessWithAuthResultCB(authResult, redirectUrl);
        return true;
      },
      signInFailure: (result) => {
        auth.signInFailureCB(result);
      },
    },
  };

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
};

export default UserSignIn;