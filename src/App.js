import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { ProvideAuth } from "./ProvideAuth";
import PrivateRoute from "./PrivateRoute";
import Navigator from "./Navigator";
import RoleSelector from "./RoleSelector";
import UserSessionEstablished from "./authenticated-endpoints/user-session-establed";

export default function App() {
  return (
    <ProvideAuth>
      <Container>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/user">User</Link>
              </li>
            </ul>
          </div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <PrivateRoute path="/user">
              <Authenticated />
            </PrivateRoute>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ProvideAuth>
  );
}

function Home() {
  return (
    <div>
      <Row>
        <Navigator />
      </Row>
      <Row>
        <RoleSelector />
      </Row>
    </div>
  );
}

function Authenticated() {
  return (
    <div>
      <Row>
        <Navigator />
      </Row>
      <Row>
        <UserSessionEstablished />
      </Row>
    </div>
  );
}
