import React from "react";
import { LinkContainer } from "react-router-bootstrap/";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./ProvideAuth";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function AnyAdminPrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  console.debug(auth.currentRole);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user &&
        (auth.currentRole === "verified-admin" ||
          auth.currentRole === "unverified-admin") ? (
          children
        ) : auth.user ? (
          <Alert variant="danger">
            <Alert.Heading>
              You don't seem to have the right account type.
            </Alert.Heading>
            <p>
              You are not signed in with an admin account. Please sign out and
              sign back in with the correct account.
            </p>
          </Alert>
        ) : (
          <Redirect
            to={{
              pathname: location.pathname + "/start",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export function UnactivatedAdminPrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  console.debug(auth.currentRole);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user && auth.currentRole === "unverified-admin" ? (
          children
        ) : auth.currentRole === "verified-admin" ? (
          <div>
            <Alert variant="success">
              <Alert.Heading>
                You have already activated your account.
              </Alert.Heading>
              <p>Click the button below to go back to the main menu.</p>
            </Alert>
            <LinkContainer to="/admin">
              <Button variant="primary" size="lg">
                Back
              </Button>
            </LinkContainer>
          </div>
        ) : (
          <div>
            <Alert variant="danger">
              <Alert.Heading>
                You don't seem to have the right account type.
              </Alert.Heading>
              <p>
                You are not signed in with an admin account. Please sign out and
                sign back in with the correct account.
              </p>
            </Alert>
          </div>
        )
      }
    />
  );
}

export function ActivatedAdminPrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  console.debug(auth.currentRole);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user && auth.currentRole === "verified-admin" ? (
          children
        ) : (
          <div>
            <Alert variant="danger">
              <Alert.Heading>
                This page is only available after you have activated your admin
                account.
              </Alert.Heading>
              <p>Please click on the button below to activate your account.</p>
              <p>
                Please note that your account will be deleted if it has not been
                activated after 3 days.
              </p>
            </Alert>
            <LinkContainer to="/admin/activate">
              <Button variant="primary" size="lg">
                Activate now
              </Button>
            </LinkContainer>
          </div>
        )
      }
    />
  );
}

export function UserPrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  console.debug(auth.currentRole);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user && auth.currentRole === "user" ? (
          children
        ) : auth.user ? (
          <Alert variant="danger">
            <Alert.Heading>
              You don't seem to have the right account type.
            </Alert.Heading>
            <p>
              You are not signed in with a user account. Please sign out and
              sign back in with the correct account.
            </p>
          </Alert>
        ) : (
          <Redirect
            to={{
              pathname: location.pathname + "/start",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
