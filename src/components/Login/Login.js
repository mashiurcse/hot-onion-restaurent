import React, { useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "./UseAuth";
//firebase
import * as firebase from "firebase/app";
import "firebase/auth";
import Cart from "../Cart/Cart";
//import firebaseConfig from "../../firebase.config";

//firebase.initializeApp(firebaseConfig);
//firebase

const Login = () => {
  //Login with user and password
  const [user, setUser] = useState({
    isSignedIn: false,
    isMember: false,
    isSignIn: false,
    displayName: "",
    email: "",
    password: "",
    retypePassword: "",
    error: "",
    isValid: false,
    isValidPassword: false,
    isSignInWithGoogle: false,
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

  const inputChangeSignIn = (e) => {
    let isValid = true;
    let isValidPassword = true;
    const newUserInfo = { ...user };
    //perform validation

    if (e.target.name === "email") {
      isValid = ValidateEmail(e.target.value);
    }

    if (e.target.name === "password") {
      isValidPassword = e.target.value.length >= 8 && hasNumber(e.target.value);
    }

    newUserInfo[e.target.name] = e.target.value;
    newUserInfo.isValid = isValid;
    newUserInfo.isValidPassword = isValidPassword;
    setUser(newUserInfo);
  };

  const createAccount = (e) => {
    if (user.password !== user.retypePassword) {
      alert("password does not match!");
      window.history.go(0);
    }

    if (user.isValid && user.isValidPassword) {
      // console.log(user.displayName, user.email);
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
          createdUser.isMember = false;
          createdUser.error = "";
          setUser(createdUser);
        })

        .catch((error) => {
          const createdUser = { ...user };
          createdUser.isSignedIn = false;
          createdUser.error = error.message;
          setUser(createdUser);
        });
    }

    e.preventDefault();
    e.target.reset();
  };

  const signInUser = (e) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        console.log(res);
        const signInUserInfo = { ...user };
        signInUserInfo.isSignIn = true;
        signInUserInfo.error = "";
        setUser(signInUserInfo);
      })
      .catch((error) => {
        const signInUserInfo = { ...user };
        signInUserInfo.isSignIn = false;
        signInUserInfo.error = error.message;
        setUser(signInUserInfo);
      });
    e.preventDefault();
    //e.target.reset();
  };

  const switchForm = (e) => {
    const isExistingUser = { ...user };
    isExistingUser.isMember = false;
    setUser(isExistingUser);
    console.log(isExistingUser);
  };

  const switchFormForSignUp = (e) => {
    const isExistingUser = { ...user };
    isExistingUser.isMember = true;
    setUser(isExistingUser);
    console.log(isExistingUser);
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        console.log("Successfully Sign Out!");
        const signInUserInfo = { ...user };
        signInUserInfo.isSignIn = false;
        signInUserInfo.displayName = "";
        signInUserInfo.email = "";
        signInUserInfo.password = "";
        signInUserInfo.error = "";
        setUser(signInUserInfo);
        console.log(signInUserInfo);
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  return (
    <div className="container">
      {user.isMember === false && user.isSignIn === false && (
        <div>
          <div>
            {auth.user ? (
              <div>
                <div style={{ display: "flex" }}>
                  <p>Welcome, {auth.user.email} </p>
                  <button
                    style={{
                      height: "25px",
                      border: "none",
                      marginLeft: "20px",
                      fontSize: "small",
                      backgroundColor: "red",
                      color: "white",
                    }}
                    onClick={signOut}
                  >
                    Sign Out
                  </button>
                </div>
                <Cart></Cart>
              </div>
            ) : (
              <button
                style={{
                  backgroundColor: "tomato",
                  borderRadius: "5px",
                }}
                onClick={auth.signInWithGoogle}
              >
                Sign in With Google
              </button>
            )}{" "}
          </div>
          <br />
          <strong
            style={{
              color: "tomato",
              fontWeight: "700",
            }}
          >
            OR
          </strong>
        </div>
      )}
      {user.isSignIn && (
        <div>
          <div style={{ display: "flex" }}>
            <p>Welcome, {user.email} </p>
            <button
              style={{
                height: "25px",
                border: "none",
                marginLeft: "20px",
                fontSize: "small",
                backgroundColor: "red",
                color: "white",
              }}
              onClick={signOut}
            >
              Sign Out
            </button>
          </div>
          <Cart></Cart>
        </div>
        // <div>
        //   <p>Welcome, {user.displayName} </p>
        //   <p>Email: {user.email} </p>
        //   <button onClick={signOut}>Sign Out</button>
        // </div>
      )}
      {user.error && <p style={{ color: "red" }}>{user.error} </p>}

      {user.isMember && (
        <form onSubmit={createAccount}>
          <h1>Sign Up</h1>
          <input
            type="text"
            onBlur={inputChange}
            name="displayName"
            id="name"
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
            <input
              type="submit"
              value="Cancel"
              style={{
                backgroundColor: "gray",
                border: "10px",
                borderRadius: "5px",
              }}
            />

            <input
              type="submit"
              value="Sign Up"
              style={{
                backgroundColor: "tomato",
                marginLeft: "20px",
                border: "10px",
                borderRadius: "5px",
              }}
            />
          </div>

          <input
            type="submit"
            value="Already an Existing User"
            onClick={switchForm}
            style={{
              border: "none",
              color: "blue",
              marginLeft: "20px",
              fontWeight: "600",
            }}
          />
        </form>
      )}

      {user.isMember === false &&
        user.isSignIn === false &&
        user.isSignInWithGoogle === false && (
          <form onSubmit={signInUser}>
            <h1>Sign In</h1>
            <input
              type="text"
              onBlur={inputChangeSignIn}
              name="email"
              // id="email"
              placeholder="Enter Email"
              required
            />
            <input
              type="password"
              name="password"
              onBlur={inputChangeSignIn}
              placeholder="Enter Password"
              required
            />
            <br />
            <input
              type="submit"
              value="Sign In"
              style={{ backgroundColor: "tomato" }}
            />
            <br />
            <input
              type="submit"
              value="Not a User,Sign Up Here!"
              onClick={switchFormForSignUp}
              style={{
                border: "none",
                color: "blue",
                fontWeight: "600",
                borderRadius: "5px",
              }}
            />
          </form>
        )}
    </div>
  );
};

export default Login;
