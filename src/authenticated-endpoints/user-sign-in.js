import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

import PromptGraphics from "../widgets/prompt-graphics";
import hello_img from "../hello.png";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyCGWQjgeoiIMJ9OWC055u7sowyKy9o3gCQ",
  authDomain: "easy-waitlist.firebaseapp.com",
  projectId: "easy-waitlist",
  storageBucket: "easy-waitlist.appspot.com",
  messagingSenderId: "681742178576",
  appId: "1:681742178576:web:d2a5b0764aacd381bf6d95",
  measurementId: "G-38CSHK03N0",
};

firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/authenticated",

  signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
};

class UserSignIn extends Component {
  state = {};
  render() {
    if (!firebase.apps.length) {
    } else {
      firebase.app(); // if already initialized, use that one
    }
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
}

export default UserSignIn;
