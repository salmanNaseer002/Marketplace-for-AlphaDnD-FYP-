import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';
import './Dashboard.css';
import Particles from '../admin/Particles';
import '../admin/Particle.css';
const Profile = ({ match }) => {

   


    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });

    const { token } = isAuthenticated();
    const { name, email, password, error, success } = values;

    const init = userId => {
        // console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, password }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        success: true
                    });
                });
            }
        });
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/cart" />;
        }
    };

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-group">
                
                <input type="text" placeholder = 'Name' onChange={handleChange('name')} className="form-control Profile-input" value={name} />
            </div>
            <div className="form-group">
                
                <input type="email" placeholder = 'E-mail' onChange={handleChange('email')} className="form-control Profile-input" value={email} />
            </div>
            <div className="form-group">
               
                <input type="password" placeholder='password' onChange={handleChange('password')} className="form-control Profile-input" value={password} />
            </div>

            <button onClick={clickSubmit} className="btn btn-block Profile-btn">
                Submit
            </button>
        </form>
    );

    return (
        <div>
            
        <Layout 
        title="MarketPlace For AlphaD&D."
        description='marketplace for react themes and plugins made in AlphaD&D, which is a web based application, used to make themes and plugins by simply dragging and dropping options.'
        className="container-fluid"
        />
        
      <div style={{height:'500px',background:'#d6e7f5'}}>
        <Particles height ='500px'/>
        <div  style={{padding:'5%'}} className='container'>
           <div   className ='row' >
               <div style={{margin:'auto'}} className='col-8'>
              
            <h2 className="mb-4 Profile-header">Profile update</h2>
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
            </div>
            </div>
            </div>
            
            </div>
        
            </div>
        
    );
};

export default Profile;