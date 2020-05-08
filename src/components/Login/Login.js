import React, { useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
//firebase
import * as firebase from "firebase/app";
import "firebase/auth";
import { useAuth } from "./UseAuth";

const Login = () => {
  //Login with user and password
  const [user, setUser] = useState({
    isSignedIn: false,
    isMember: false,
    isSignIn: false,
    isLogedIn: false,
    displayName: "",
    email: "",
    password: "",
    retypePassword: "",
    error: "",
    isValid: false,
    isValidPassword: false,
    isSignInWithGoogle: false,
  });

  const auth = useAuth();
  // console.log(auth);

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
      // if (isValidPassword === false) {
      //   alert("Invalid Password!");
      //}
    }

    newUserInfo[e.target.name] = e.target.value;
    newUserInfo.isValid = isValid;
    newUserInfo.isValidPassword = isValidPassword;
    setUser(newUserInfo);
  };

  const inputChangeSignIn = (e) => {
    const signedInUserInfo = { ...user };

    signedInUserInfo[e.target.name] = e.target.value;
    signedInUserInfo.isValid = true;
    signedInUserInfo.isValidPassword = true;
    setUser(signedInUserInfo);
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
          //  console.log(res);
          const createdUser = { ...user };
          createdUser.isSignedIn = true;
          createdUser.isMember = false;
          createdUser.error = "";
          setUser(createdUser);
        })
        .then(() => {
          const usr = firebase.auth().currentUser;
          // console.log(usr);
          // console.log(user.displayName);
          usr
            .updateProfile({
              displayName: user.displayName,
              // photoURL: "https://example.com/jane-q-user/profile.jpg",
            })
            .then(() => {
              window.location.pathname = "/cart";
            })
            .then(function (res) {
              // console.log(usr.displayName);
              const createdUser = { ...user };
              createdUser.isSignedIn = true;
              createdUser.isMember = false;
              createdUser.error = "";
              setUser(usr);
              // Update successful.
            })
            .catch(function (error) {
              // An error happened.
            });
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
        signInUserInfo.isLogedIn = true;
        signInUserInfo.error = "";
        setUser(signInUserInfo);
      })
      .then(() => {
        window.location.pathname = "/cart";
      })
      .catch((error) => {
        const signInUserInfo = { ...user };
        signInUserInfo.isSignIn = false;
        signInUserInfo.error = error.message;
        setUser(signInUserInfo);
      });
    e.preventDefault();
    e.target.reset();
  };

  const switchForm = (e) => {
    const isExistingUser = { ...user };
    isExistingUser.isMember = false;
    setUser(isExistingUser);
    //console.log(isExistingUser);
  };

  const switchFormForSignUp = (e) => {
    const isExistingUser = { ...user };
    isExistingUser.isMember = true;
    setUser(isExistingUser);
    //console.log(isExistingUser);
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        console.log("Successfully Sign Out!");
        const signInUserInfo = { ...user };
        signInUserInfo.isSignIn = false;
        signInUserInfo.isLogedIn = false;
        signInUserInfo.displayName = "";
        signInUserInfo.email = "";
        signInUserInfo.password = "";
        signInUserInfo.error = "";
        setUser(signInUserInfo);
      })
      .catch(function (error) {
        console.log(error);
      });
    window.location.pathname = "/";
  };

  return (
    <div className="container">
      <button
        style={{
          backgroundColor: "tomato",
          borderRadius: "5px",
        }}
        onClick={auth.signInWithGoogle}
      >
        Sign in With Google
      </button>
      <br />
      <div>
        <strong
          style={{
            color: "tomato",
            fontWeight: "700",
          }}
        >
          OR
        </strong>
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
        {user.isMember === false && user.isSignInWithGoogle === false && (
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

      {user.error && <p style={{ color: "red" }}>{user.error} </p>}
    </div>
  );
};

export default Login;
