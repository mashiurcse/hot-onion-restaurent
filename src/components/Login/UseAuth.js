import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState } from "react";

firebase.initializeApp(firebaseConfig);

const Auth = () => {
  const [user, setUser] = useState(null);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignInWithGoogle: true,
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
  };
};

export default Auth;
