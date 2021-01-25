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
      <Spinner animation="border" size="lg" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
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

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.

  const signInSuccessWithAuthResultCB = (authResult, redirectUrld) => {
    setUser(authResult);
  };

  const signInFailureCB = (result) => {
    setUser(false);
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  useEffect(() => {
    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      setLoaded(true);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  });

  // Return the user object and auth methods
  return {
    loaded,
    user,
    setUser,
    signInSuccessWithAuthResultCB,
    signInFailureCB,
    signout,
  };
}
