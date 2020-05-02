import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState } from "react";

firebase.initializeApp(firebaseConfig);

const Auth = () => {
  const [user, setUser] = useState(null);

  const signInWithEmailPassword = () => {
    const email = "mashiur@y.com";
    const password = "1234";

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        return errorMessage;
      });
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email,
          photo: photoURL,
        };
        console.log(signedInUser.name);
        setUser(signedInUser);
        return res.user;
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
        return err.message;
      });
  };
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setUser(null);
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  return {
    user,
    signInWithGoogle,
    signOut,
    signInWithEmailPassword,
  };
};

export default Auth;
