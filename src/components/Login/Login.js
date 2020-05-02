import React, { useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "./UseAuth";

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
    isValidRePassword: false,
  });

  //Login with Google
  const auth = Auth();
  console.log(auth);

  //Login with Email and password
  const CreateAccountA = (e) => {
    console.log(auth.signInWithEmailPassword);
  };
  //console.log(user);
  const ValidateEmail = (email) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const hasNumber = (input) =>
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/.test(input);
  let isValid = true;
  let isValidPassword = true;
  let isValidRePassword = true;
  const inputChange = (e) => {
    const newUserInfo = { ...user };
    //perform validation

    if (e.target.name === "email") {
      // return true;
      isValid = ValidateEmail(e.target.value);
      if (isValid === false) {
        alert("Invalid Email!");
      }
    }

    if (e.target.name === "password") {
      isValidPassword = e.target.value.length > 8 && hasNumber(e.target.value);
    }

    if (e.target.name === "retypePassword") {
      isValidRePassword =
        e.target.value.length > 8 && hasNumber(e.target.value);
    }

    newUserInfo[e.target.name] = e.target.value;
    newUserInfo.isValid = isValid;
    newUserInfo.isValidPassword = isValidPassword;
    newUserInfo.isValidRePassword = isValidRePassword;
    setUser(newUserInfo);
    if (user.password !== user.retypePassword) {
      alert("password does not match!");
      window.history.go(0);
    }
    //console.log(newUserInfo);
  };
  const createAccount = (e) => {
    if (user.isValid && user.isValidPassword && user.isValidRePassword) {
      console.log(user.username, user.email);
    } else {
      alert("Not valid email or Password");
      //console.log("Not Valid");
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
      <div>
        <form onSubmit={CreateAccountA}>
          <input
            type="text"
            name="emaila"
            id="emaila"
            placeholder="Enter Email"
            required
          />
          <input
            type="password"
            name="passworda"
            placeholder="Enter Password"
            required
          />
          <br />
          <input
            type="submit"
            className="signupbtn"
            value="Create Account"
            style={{ backgroundColor: "tomato" }}
          />
        </form>
      </div>
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
          <input type="submit" value="Cancel" className="cancelbtn" />

          <input
            type="submit"
            className="signupbtn"
            value="Sign Up"
            style={{ backgroundColor: "tomato" }}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
