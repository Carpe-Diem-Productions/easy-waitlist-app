import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

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
import AdminSetZipRange from "./admin-inputs/admin-set-zip-range";
import AdminSearchInWaitlist from "./admin-inputs/admin-search-in-waitlists";

import AddToWaitlistWizard from "./user-inputs/add-to-waitlist-wizard";
import VerifyExistingWaitlistStatus from "./user-inputs/verify-existing-waitlist-status";
import RemoveExistingWaitlist from "./user-inputs/remove-existing-waitlist";

export default function App() {
  return (
    <Container fluid="lg">
      <ProvideAuth>
        <Router>
          <Navigator />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            {/* Unautenticated */}
            <Route path="/user/start">
              <SimpleSymptomsQuestion />
            </Route>
            <Route path="/user/login">
              <UserSignIn />
            </Route>
            <Route path="/admin/start">
              <AdminSignIn />
            </Route>

            {/* Autenticated as user*/}
            <UserPrivateRoute path="/user/add">
              <AddToWaitlistWizard />
            </UserPrivateRoute>
            <UserPrivateRoute path="/user/verify">
              <VerifyExistingWaitlistStatus />
            </UserPrivateRoute>
            <UserPrivateRoute path="/user/remove">
              <RemoveExistingWaitlist />
            </UserPrivateRoute>
            <UserPrivateRoute path="/user">
              <UserSessionEstablished />
            </UserPrivateRoute>

            {/* Autenticated as admin, activated only*/}
            <ActivatedAdminPrivateRoute path="/admin/set-zip-range">
              <AdminSetZipRange />
            </ActivatedAdminPrivateRoute>
            <ActivatedAdminPrivateRoute path="/admin/search-in-waitlist">
              <AdminSearchInWaitlist />
            </ActivatedAdminPrivateRoute>
            {/* Autenticated as admin, unactivated only*/}
            <UnactivatedAdminPrivateRoute path="/admin/activate">
              <AdminActivatePage />
            </UnactivatedAdminPrivateRoute>
            {/* Autenticated as admin, both activated and unactivated */}
            <AnyAdminPrivateRoute path="/admin/profile">
              <AdminInfoForm />
            </AnyAdminPrivateRoute>
            <AnyAdminPrivateRoute path="/admin">
              <AdminSessionEstablished />
            </AnyAdminPrivateRoute>

            {/* Main, unauthenticated, must be last item on list */}
            <Route path="/">
              <RoleSelector />
            </Route>
          </Switch>
        </Router>
      </ProvideAuth>
    </Container>
  );
}
