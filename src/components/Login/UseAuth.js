import React, { useContext, useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState, createContext } from "react";
import { Route, Redirect } from "react-router-dom";

firebase.initializeApp(firebaseConfig);
//create context
const AuthContext = createContext();
//context Provider use in  Apps for all children
export const AuthContextProvider = (props) => {
  const auth = Auth();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};
//use Context
export const useAuth = () => useContext(AuthContext);

export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const Auth = () => {
  const [user, setUser] = useState(null);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return (
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
          const { displayName, email, photoURL } = res.user;
          const signedInUser = {
            isSignInWithGoogle: true,
            isLogedIn: true,
            isSignedIn: true,
            name: displayName,
            email,
            photo: photoURL,
          };
          setUser(signedInUser);
          return res.user;
        })
        // .then(() => {
        //   window.location.pathname = "/shipment";
        // })
        .catch((err) => {
          setUser(null);
          return err.message;
        })
    );
  };
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setUser(null);
        // Sign-out successful.
        window.location.pathname = "/";
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  const getUser = (user) => {
    const { displayName, email } = user;
    return { name: displayName, email };
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (usr) {
      if (usr) {
        const currUser = getUser(usr);
        // console.log(currUser.name);
        setUser(currUser);
        // User is signed in.
      } else {
        console.log("No User is SignedIn");
      }
    });
  }, []);

  return {
    user,
    signInWithGoogle,
    signOut,
  };
};

export default Auth;
