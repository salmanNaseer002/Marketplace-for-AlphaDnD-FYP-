import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';
import '../styles.css'
import './Dashboard.css';
import Particles from '../admin/Particles';
import '../admin/Particle.css';
const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <form >
            <div className="form-group mt-3">
               
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <span className="fa fa-user"></span>
                        </span>                    
                    </div>
                    <input onChange={handleChange('name')} type="text" placeholder='Name' className="form-control Form-input" value={name} />
                </div>
            </div>

            <div className="form-group">
                
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <span className="fa fa-paper-plane"></span>
                        </span>                    
                    </div>
                    <input onChange={handleChange('email')} type="email" placeholder='username@gmail.com' className="form-control Form-input" value={email} />
                </div>
            </div>

            <div className="form-group">
                
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <span className="fa fa-key"></span>
                        </span>                    
                    </div>
                    <input onChange={handleChange('password')} type="password" placeholder='Password' className="form-control Form-input" value={password} />
                </div>
            </div>
            <button onClick={clickSubmit} className="btn-block mb-4 Form-btn">
                Create your Alpha D&D account
            </button>
            <p style ={{fontWeight:'400'}} ><span style ={{color:' #e9ecef'}}>By creating an account, you agree to</span><Link>Alpha D&D Conditions of Use and Privacy Notice.</Link> </p>
            <p style ={{fontWeight:'400'}} ><span style ={{color:' #e9ecef'}}>Already have an account?</span><Link to="/signin"> Sign-In</Link> </p>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (

        <div>   
        <Layout
              title="MarketPlace For AlphaD&D."
              description='marketplace for react themes and plugins made in AlphaD&D, which is a web based application, used to make themes and plugins by simply dragging and dropping options.'
              className="container-fluid"
        />

<div style={{height:'600px',background:'#343a40',opacity:'0.97'}}>
            <Particles height='600px'></Particles>
        <div  style={{padding:'5%'}}className='container'>
            <div className='row'>
                <div style={{margin:'auto'}} className='col-7'>
                {showSuccess()}
                 {showError()}
                {signUpForm()}
                </div>
            </div>

            </div>
        </div>
            
            </div>
    );
};

export default Signup;