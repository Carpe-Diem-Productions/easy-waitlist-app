import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import firebase from "../MyFirebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { useAuth } from "../ProvideAuth";

import PromptGraphicsCol from "../widgets/prompt-graphics";
import lock_img from "../images/lock.png";

const UserSignIn = () => {
  let auth = useAuth();

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
    <div>
      <Row className="mx-3 my-3 justify-content-center">
        <h1>User Sign In</h1>
      </Row>
      <Row className="mx-lg-3 my-3">
        <PromptGraphicsCol
          img_path={lock_img}
          alt_text="An illustration of a lock"
        />
        <Col className="mx-auto">
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </Col>
      </Row>
    </div>
  );
};

export default UserSignIn;
