import React, { useState, useEffect, useContext, createContext } from "react";

import Spinner from "react-bootstrap/Spinner";
import firebase from "./MyFirebase";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  if (auth.loaded) {
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
  } else {
    return (
      <div>
        <h1>Loading...</h1>
        <Spinner animation="border" size="lg" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.

export function useAuth() {
  return useContext(authContext);
}

// Provider hook that creates auth object and handles state

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [currentRole, setCurrentRole] = useState("visitor");

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.

  const enterRoleBasedOnClaims = (user) => {
    if (!user) {
      setUser(null);
      setCurrentRole("visitor");
    } else {
      setUser(user);
      user.getIdTokenResult(true).then((idTokenResult) => {
        if (!!idTokenResult.claims.could_see_admin) {
          if (!!idTokenResult.claims.admin_activated) {
            setCurrentRole("verified-admin");
          } else {
            setCurrentRole("unverified-admin");
          }
        } else {
          setCurrentRole("user");
        }
      });
    }
  };

  const signInSuccessWithAuthResultCB = (authResult, redirectUrld) => {
    enterRoleBasedOnClaims(authResult.user);
  };

  const signInFailureCB = (result) => {
    enterRoleBasedOnClaims(null);
  };

  const refreshIdToken = () => {
    if (user) {
      return user.getIdToken(true).then(() => {
        enterRoleBasedOnClaims(user);
      });
    }
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        enterRoleBasedOnClaims(null);
      });
  };

  useEffect(() => {
    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    // This hook is primarily used to handle directly visitng a priviledged
    // URL which doesn't force the user to sign in again

    const unsubscribe1 = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await enterRoleBasedOnClaims(user);
        setLoaded(true);
      } else {
        enterRoleBasedOnClaims(null);
        setLoaded(true);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe1();
    };
  });

  // Return the user object and auth methods
  return {
    user,
    loaded,
    currentRole,
    signInSuccessWithAuthResultCB,
    signInFailureCB,
    refreshIdToken,
    signout,
  };
}
