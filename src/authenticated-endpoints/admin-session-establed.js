import React from "react";

import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";

import { useAuth } from "../ProvideAuth";
import { LinkContainer } from "react-router-bootstrap";

const AdminSessionEstablished = () => {
  let auth = useAuth();
  let userDisplayName = auth.user.displayName;

  return (
    <div>
      <Jumbotron className="my-3">
        <h1>Welcome, {userDisplayName}!</h1>
        <p>Let us help you find last-minute COVID-19 vaccine recipients.</p>
        <p>
          <LinkContainer to="/admin/activate">
            <Button variant="primary" size="lg">
              Activate
            </Button>
          </LinkContainer>
        </p>
        <p>
          <LinkContainer to="/admin/set-zip-range">
            <Button variant="primary" size="lg">
              Set Zip Range
            </Button>
          </LinkContainer>
        </p>
        <p>
          <LinkContainer to="/admin/search-in-waitlist">
            <Button variant="primary" size="lg">
              Search In Waitlist
            </Button>
          </LinkContainer>
        </p>
      </Jumbotron>
    </div>
  );
};

export default AdminSessionEstablished;
