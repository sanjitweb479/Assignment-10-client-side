import React from "react";
import Button from "react-bootstrap/Button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LeftSideNav from "../LeftSideNav/LeftSideNav";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { Image } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Header.css";

const Header = () => {
  const { user, providerLogin, logOut } = useContext(AuthContext);

  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();

  const showUserNameAsAToast = () => {
    return toast(user?.displayName);
  };

  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => console.error(error));
  };

  const handleGithubSignIn = () => {
    providerLogin(gitHubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => console.error(error));
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        className="mb-3"
        expand="lg"
        bg="dark"
        variant="light"
      >
        <Container className="Header-container">
          <Navbar.Brand>
            <Link to="/">
              <h2>Online-Mentor</h2>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="mx-3">
                Courses
              </Link>
              <Link to="/pricing" className="me-3">
                FAQ
              </Link>
              <Link to="/blog" className="me-2">
                Blog
              </Link>
              <Button
                className="mx-2"
                onClick={handleGoogleSignIn}
                variant="outline-success"
                size="sm"
              >
                <FaGoogle></FaGoogle> Login via Google
              </Button>
              <Button
                className="mx-2"
                onClick={handleGithubSignIn}
                variant="outline-success"
                size="sm"
              >
                <FaGithub></FaGithub> Login via GitHub
              </Button>
            </Nav>
            <Nav>
              {user?.uid ? (
                <>
                  <Image
                    className="mx-2"
                    onMouseEnter={showUserNameAsAToast}
                    style={{ height: "40px" }}
                    roundedCircle
                    src={user?.photoURL}
                  ></Image>
                  <ToastContainer />
                  <Button
                    className="mx-2"
                    variant="light"
                    onClick={handleLogOut}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Link className="mx-2" to="/login">
                    Login
                  </Link>
                  <Link className="mx-2" to="/register">
                    Register
                  </Link>
                </>
              )}
            </Nav>
            <div className="d-lg-none">
              <LeftSideNav></LeftSideNav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
