import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { ProvideAuth } from "./ProvideAuth";
import PrivateRoute from "./PrivateRoute";
import Navigator from "./Navigator";
import RoleSelector from "./RoleSelector";
import UserSignIn from "./user-inputs/user-sign-in";
import SimpleSymptomsQuestion from "./user-inputs/simple-symptoms-question";
import UserSessionEstablished from "./authenticated-endpoints/user-session-establed";
import AdminSessionEstablished from "./authenticated-endpoints/admin-session-establed";

import AddToWaitlistWizard from "./user-inputs/add-to-waitlist-wizard";
import VerifyExistingWaitlistStatus from "./user-inputs/verify-existing-waitlist-status";
import RemoveExistingWaitlist from "./user-inputs/remove-existing-waitlist";

export default function App() {
  return (
    <ProvideAuth>
      <Container>
        <Router>
          <Navigator />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <PrivateRoute path="/user/add">
              <AddToWaitlistWizard />
            </PrivateRoute>
            <PrivateRoute path="/user/verify">
              <VerifyExistingWaitlistStatus />
            </PrivateRoute>
            <PrivateRoute path="/user/remove">
              <RemoveExistingWaitlist />
            </PrivateRoute>
            <Route path="/user/start">
              <SimpleSymptomsQuestion />
            </Route>
            <Route path="/user/login">
              <UserSignIn />
            </Route>
            <PrivateRoute path="/user">
              <UserSessionEstablished />
            </PrivateRoute>
            <PrivateRoute path="/admin">
              <AdminSessionEstablished />
            </PrivateRoute>
            <Route path="/">
              <RoleSelector />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ProvideAuth>
  );
}
