"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import styles from "./login.module.css";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A functional component that renders a login and sign-up form with a toggleable
 * interface. It handles user authentication by allowing users to either sign in
 * with existing credentials or sign up to create a new account.
*
* Features:
* - Sign-up form for new users to register with their name, email, and password.
 * - Sign-in form for existing users to log in with their email and password.
 * - Toggle functionality to switch between sign-in and sign-up forms.
 * - Handles authentication requests to the server and manages access tokens on
 *   successful login.
 * - Redirects users to the dashboard upon successful login.
 * - Includes an overlay with additional information and navigation buttons.
*/

/*******  95224e5b-ff1b-4516-9aa5-c1ca638bb9cb  *******/export default function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // Toggle between sign-in and sign-up
  const togglePanel = () => {
    setIsSignUp(!isSignUp);
  };

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch("http://localhost:7000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Sign up successful");
        console.log(res);
        
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false)
    }
  };

  //login function
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch("http://localhost:7000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signInData.email,
          password: signInData.password,
        }),
        credentials: "include", //inculdes cookies
      });
      const data = await res.json();
      if (res.ok) {
        alert("Login successful");
        console.log(res);

        login(data.accessToken); // save token to context
        localStorage.setItem("accessToken", data.accessToken)
        router.push("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className={styles.body}>
      {loading && <div className={styles.loading}></div>}
      <motion.div
        className={`${styles.container} ${
          isSignUp ? styles.panelRightActive : ""
        }`}
      >
        {/* Sign Up Form */}
        <div className={`${styles.formContainer} ${styles.signUp}`}>
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <div className={styles.infield}>
              <input
                type="text"
                placeholder="Name"
                required
                value={signUpData.name}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, name: e.target.value })
                }
              />
              <label htmlFor=""></label>
            </div>
            <div className={styles.infield}>
              <input
                type="email"
                placeholder="Email"
                required
                value={signUpData.email}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, email: e.target.value })
                }
              />
              <label htmlFor=""></label>
            </div>
            <div className={styles.infield}>
              <input
                type="password"
                placeholder="Password"
                required
                value={signUpData.password}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, password: e.target.value })
                }
              />
              <label htmlFor=""></label>
            </div>
            <button type="submit">Sign up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`${styles.formContainer} ${styles.signIn}`}>
          <form onSubmit={handleLogin}>
            <h1>Sign in</h1>
            <span>or use your account</span>
            <div className={styles.infield}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                value={signInData.email}
                onChange={(e) =>
                  setSignInData({ ...signInData, email: e.target.value })
                }
              />
              <label htmlFor=""></label>
            </div>
            <div className={styles.infield}>
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                value={signInData.password}
                onChange={(e) =>
                  setSignInData({ ...signInData, password: e.target.value })
                }
              />
              <label htmlFor=""></label>
            </div>
            <a href="Forgot your password" className={styles.forgot}>
              Forgot your password?
            </a>
            <button type="submit">Sign in</button>
          </form>
        </div>

        {/* Overlay Container */}
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            {/* Left Side Overlay */}
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button type="button" onClick={togglePanel}>
                Sign in
              </button>
            </div>
            {/* Right Side Overlay */}
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1>Hello, Friend</h1>
              <p>Enter your personal details and start your journey</p>
              <button type="button" onClick={togglePanel}>
                Signup
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
