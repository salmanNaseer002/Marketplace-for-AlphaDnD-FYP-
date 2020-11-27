import React, { useState } from "react";
import { Redirect,Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";
import '../styles.css'
import './Dashboard.css';
import Particles from '../admin/Particles';
import '../admin/Particle.css';
const Signin = () => {
    const [values, setValues] = useState({
        email: "salman@gmail.com",
        password: "salman786",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () => (
        <form className='mb-3' onSubmit={clickSubmit}>
           
            <div className="form-group mt-3">


                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                            <span className="input-group-text" ><i className="fas fa-user rounded" style={{border:"none"}}></i></span>
                    </div>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    placeholder ='user@gmail.com'
                    className="form-control Form-input"
                    value={email}
                />
                </div>
            </div>

            <div className="form-group ">
                
                <div className="input-group mb-2">
							<div className="input-group-prepend">
								<span className="input-group-text"><i className="fas fa-key "></i></span>
							</div>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    placeholder ='password'
                    className="form-control Form-input"
                    value={password}
                    
                />
                </div>
                
            </div>
        
            <button  style={{cursor:'pointer'}}  className="btn  btn-block btn-md  mb-4 Form-btn">Sign-IN</button>
            <p style ={{fontWeight:'400'}} ><span style ={{color:' #e9ecef'}}>By continuing, you agree to</span> <Link>Alpha D&D Conditions of Use and Privacy Notice.</Link> </p>
            
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <div>
        <Layout
            title="MarketPlace For AlphaD&D."
            description='marketplace for react themes and plugins made in AlphaD&D, which is a web based application, used to make themes and plugins by simply dragging and dropping options.'
            className="container-fluid"
        />
        
        <div style={{height:'500px',background:'#343a40',opacity:'0.97'}}>
            <Particles height='500px'></Particles>
        
       
       <div  style={{padding:'5%'}}className='container'>
           <div className='row'>
               <div style={{margin:'auto'}}className='col-7'>
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
               </div>
           </div>
       </div>
        
           
           
       </div>
        </div>
        
);
};

export default Signin;