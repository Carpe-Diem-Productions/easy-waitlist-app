import React, { useState } from "react";

import { Redirect, useLocation } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

import firebase from "../MyFirebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { useAuth } from "../ProvideAuth";

import PromptGraphicsCol from "../widgets/prompt-graphics";
import lock_img from "../images/lock.png";

const AdminSignIn = (props) => {
  let location = useLocation();
  let auth = useAuth();

  const [waitingOnCloudFunctions, setWaitingOnCloudFunctions] = useState(false);
  const [signinSuccess, setSigninSuccess] = useState(false);
  const [dbError, setDbError] = useState("");
  const [dbCompleted, setDbCompleted] = useState(false);

  const storeAdminInfo = (authResult) => {
    console.debug("Adding new admin into list");
    var adminInfo = null;

    if (authResult.user.email !== null) {
      adminInfo = {
        uid: authResult.user.uid,
        displayName: authResult.user.displayName,
        email: authResult.user.email,
        emailVerified: authResult.user.emailVerified,
      };
    } else {
      console.log("No valid phoneNumber or email???");
      return;
    }

    firebase
      .database()
      .ref("/unverified-admins/" + authResult.user.uid)
      .set(adminInfo, (error) => {
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
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],

    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        auth.signInSuccessWithAuthResultCB(authResult, redirectUrl);
        setWaitingOnCloudFunctions(true);
        if (!!authResult.additionalUserInfo.isNewUser) {
          storeAdminInfo(authResult);
        } else {
          setDbCompleted(true);
        }
        const metadataRef = firebase
          .database()
          .ref("/metadata/" + authResult.user.uid + "/idTokenRefreshTime");
        // Because custom claims are set using Cloud Functions and doesn't happen right away
        // (even though it should happen quickly enough), monitoring the value at this
        // database location will tell us whether custom claims have been set.
        metadataRef.on("value", async (snapshot) => {
          if (snapshot.val() != null) {
            await auth.refreshIdToken();
            setWaitingOnCloudFunctions(false);
            setSigninSuccess(true);
            metadataRef.off("value");
          }
        });
        return false;
      },
      signInFailure: (result) => {
        auth.signInFailureCB(result);
        setWaitingOnCloudFunctions(false);
        setSigninSuccess(false);
      },
    },
  };

  if (signinSuccess && dbCompleted) {
    if (dbError !== "") {
      console.warn(dbError);
    }
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
      <div>
        <Row className="mx-3 my-3 justify-content-center">
          <h1>Admin Sign In</h1>
        </Row>
        <Row className="mx-lg-3 my-3">
          <PromptGraphicsCol
            img_path={lock_img}
            alt_text="An illustration of a lock"
          />

          <Col className="mx-auto">
            {!!waitingOnCloudFunctions ? (
              <div>
                <Row className="mx-auto justify-content-center">
                  <h4>Preparing your account...</h4>
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </Row>
              </div>
            ) : (
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
};

export default AdminSignIn;
