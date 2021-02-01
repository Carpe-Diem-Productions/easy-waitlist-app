import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { ProvideAuth } from "./ProvideAuth";
import {
  AnyAdminPrivateRoute,
  UnactivatedAdminPrivateRoute,
  ActivatedAdminPrivateRoute,
  UserPrivateRoute,
} from "./PrivateRoute";
import Navigator from "./Navigator";
import RoleSelector from "./RoleSelector";
import UserSignIn from "./user-inputs/user-sign-in";
import SimpleSymptomsQuestion from "./user-inputs/simple-symptoms-question";
import UserSessionEstablished from "./authenticated-endpoints/user-session-establed";

import AdminSignIn from "./admin-inputs/admin-sign-in";
import AdminSessionEstablished from "./authenticated-endpoints/admin-session-establed";
import AdminInfoForm from "./admin-inputs/admin-info-form";
import AdminActivatePage from "./admin-inputs/admin-activate-page";

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
            <UserPrivateRoute path="/user/add">
              <AddToWaitlistWizard />
            </UserPrivateRoute>
            <UserPrivateRoute path="/user/verify">
              <VerifyExistingWaitlistStatus />
            </UserPrivateRoute>
            <UserPrivateRoute path="/user/remove">
              <RemoveExistingWaitlist />
            </UserPrivateRoute>
            <Route path="/user/start">
              <SimpleSymptomsQuestion />
            </Route>
            <Route path="/user/login">
              <UserSignIn />
            </Route>
            <UserPrivateRoute path="/user">
              <UserSessionEstablished />
            </UserPrivateRoute>

            <Route path="/admin/profile">
              <AdminInfoForm />
            </Route>

            <ActivatedAdminPrivateRoute path="/admin/post-activation">
              <h1>Congrats you are activated!</h1>
            </ActivatedAdminPrivateRoute>

            <UnactivatedAdminPrivateRoute path="/admin/activate">
              <AdminActivatePage />
            </UnactivatedAdminPrivateRoute>

            <Route path="/admin/start">
              <AdminSignIn />
            </Route>
            <AnyAdminPrivateRoute path="/admin">
              <AdminSessionEstablished />
            </AnyAdminPrivateRoute>
            <Route path="/">
              <RoleSelector />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ProvideAuth>
  );
}
