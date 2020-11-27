import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import "../styles.css";
const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#FFFFFF" };
    } else {
        return { color: "#a3a0a0" };
    }
};

const isYellow = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#F07D17" };
    } else {
        return { color: "#959595" };
    }
};

const Menu = ({ history }) => (
    <div style={{background:'#343a40',fontWeight:'600',fontSize:'1.1rem',paddingRight:'3%',paddingLeft:'3%'}} >
        <ul  className="nav navbar-dark bg-dark ">

        <li style={{padding:'15px',paddingRight:'3px'}} className="nav-item navbtn">
                <a
                    className="nav-link   "
                    style={isActive(history, "/")}
                    href="http://alphadnd.com/"
                >
                    Alpha DnD
                </a>
            </li>
       
            <li style={{padding:'15px',paddingRight:'3px'}} className="nav-item navbtn">
                <Link
                    className="nav-link   "
                    style={isActive(history, "/")}
                    to="/"
                >
                    Home
                </Link>
            </li>

            <li style={{padding:'15px',paddingRight:'3px'}} className="nav-item navbtn">
                <Link
                    className="nav-link"
                    style={isActive(history, "/shop")}
                    to="/shop"
                >
                    Shop
                </Link>
            </li>
        
        <ul className="nav navbar-dark bg-dark ml-auto">
            <li style={{padding:'15px',paddingRight:'3px'}} className="nav-item navbtn">
                <Link
                    className="nav-link "
                    style={isActive(history, "/cart")}
                    to="/cart"
                >
                    <i className="fas fa-shopping-cart "></i>{" "}
                    <sup>
                        <span className="badge badge-2x" style={isYellow(history, "/cart") }><span  style={{ fontSize:16}}>{itemTotal()}</span></span>
                        
                    </sup>
                </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li style={{padding:'15px',paddingRight:'3px'}} className="nav-item navbtn">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/user/dashboard")}
                        to="/user/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li style={{padding:'15px',paddingRight:'3px'}}className="nav-item navbtn">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li  style={{padding:'15px',paddingRight:'3px'}}className="nav-item navbtn">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            Signin
                        </Link>
                    </li>

                    <li style={{padding:'15px',paddingRight:'3px'}} className="nav-item  navbtn">
                        <Link
                            className="nav-link "
                            style={isActive(history, "/signup")}
                            to="/signup"
                        >
                            Signup
                        </Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li style={{padding:'15px',paddingRight:'3px'}} className="nav-item navbtn">
                    <span
                        className="nav-link txt-light"
                        style={{ cursor: "pointer", color: "white"  }}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                        Signout
                    </span>
                </li>
            )}
        </ul>
        </ul>
    </div>
);

export default withRouter(Menu);