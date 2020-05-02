import React, { useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "./UseAuth";
//firebase
import * as firebase from "firebase/app";
import "firebase/auth";
//import firebaseConfig from "../../firebase.config";

//firebase.initializeApp(firebaseConfig);
//firebase

const Login = () => {
  //Login with user and password
  const [user, setUser] = useState({
    isSignedIn: false,
    username: "",
    email: "",
    password: "",
    retypePassword: "",
    isValid: false,
    isValidPassword: false,
  });

  //Login with Google
  const auth = Auth();
  // console.log(auth);

  //console.log(user);
  const ValidateEmail = (email) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const hasNumber = (input) =>
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/.test(input);

  //let isValidRePassword = true;
  const inputChange = (e) => {
    let isValid = true;
    let isValidPassword = true;
    const newUserInfo = { ...user };
    //perform validation

    if (e.target.name === "email") {
      isValid = ValidateEmail(e.target.value);
      if (isValid === false) {
        alert("Invalid Email!");
      }
    }

    if (e.target.name === "password") {
      isValidPassword = e.target.value.length >= 8 && hasNumber(e.target.value);
      if (isValidPassword === false) {
        alert("Invalid Password!");
      }
    }

    newUserInfo[e.target.name] = e.target.value;
    newUserInfo.isValid = isValid;
    newUserInfo.isValidPassword = isValidPassword;
    setUser(newUserInfo);
    //console.log(newUserInfo);
  };
  const createAccount = (e) => {
    if (user.password !== user.retypePassword) {
      alert("password does not match!");
      window.history.go(0);
    }

    if (user.isValid && user.isValidPassword) {
      console.log(user.username, user.email);
    } else {
      alert("Not valid email or Password");
    }

    //firebase
    if (user.isValid) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          console.log(res);
          const createdUser = { ...user };
          createdUser.isSignedIn = true;
          setUser(createdUser);
        })
        .catch((error) => {
          // Handle Errors here.
          // const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          return errorMessage;
        });
    }

    e.preventDefault();
    e.target.reset();
  };

  return (
    <div className="container">
      <div>
        {auth.user ? (
          <div>
            <h1>{auth.user.name}</h1>
            <button onClick={auth.signOut}>Sign Out</button>
          </div>
        ) : (
          <button onClick={auth.signInWithGoogle}>Sign in With Google</button>
        )}{" "}
      </div>

      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.username} </p>
          <p>Email: {user.email} </p>
        </div>
      )}

      <h1>Sign Up</h1>
      <form onSubmit={createAccount}>
        <input
          type="text"
          onBlur={inputChange}
          name="username"
          placeholder="Enter Name"
          required
        />
        <input
          type="text"
          onBlur={inputChange}
          name="email"
          id="email"
          placeholder="Enter Email"
          required
        />
        <input
          type="password"
          name="password"
          onBlur={inputChange}
          placeholder="Enter Password"
          required
        />
        <input
          type="password"
          name="retypePassword"
          onBlur={inputChange}
          placeholder="Repeat Password"
          required
        />
        <div className="checkout">
          <input type="submit" value="Cancel" />

          <input
            type="submit"
            value="Sign Up"
            style={{ backgroundColor: "tomato", marginLeft: "20px" }}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
